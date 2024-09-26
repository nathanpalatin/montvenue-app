import axios, { AxiosError, AxiosInstance } from 'axios'

import { AppError } from '../utils/AppError'
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken'

type SignOut = () => void

type PromiseType = {
	onSuccess: (token: string) => void
	onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
	registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL
}) as APIInstanceProps

let failedQueued: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
	const interceptTokenManager = api.interceptors.response.use(
		response => response,
		async requestError => {
			if (requestError.response?.status === 401) {
				const { refreshToken } = await storageAuthTokenGet()

				if (!refreshToken) {
					signOut()
					return Promise.reject(requestError)
				}

				const originalRequestConfig = requestError.config

				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueued.push({
							onSuccess: (token: string) => {
								originalRequestConfig.headers = { Authorization: `${token}` }
								resolve(api(originalRequestConfig))
							},
							onFailure: (error: AxiosError) => {
								reject(error)
							}
						})
					})
				}

				isRefreshing = true

				return new Promise(async (resolve, reject) => {
					try {
						const { data } = await api.patch('/user/token/refresh', {
							refreshToken
						})

						await storageAuthTokenSave({
							token: data.token,
							refreshToken: data.refreshToken
						})

						if (originalRequestConfig.data) {
							originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
						}

						originalRequestConfig.headers = {
							Authorization: `${data.token}`
						}
						api.defaults.headers.common['Authorization'] = `${data.token}`

						failedQueued.forEach(request => {
							request.onSuccess(data.token)
						})

						console.log('============> TOKEN ATUALIZADO <============')

						resolve(api(originalRequestConfig))
					} catch (error: any) {
						console.log(error)
						failedQueued.forEach(request => {
							request.onFailure(error)
						})

						signOut()
						reject(error)
					} finally {
						isRefreshing = false
						failedQueued = []
					}
				})
			}

			if (requestError.response && requestError.response.data) {
				return Promise.reject(new AppError(requestError.response.data))
			} else {
				return Promise.reject(requestError)
			}
		}
	)

	return () => {
		api.interceptors.response.eject(interceptTokenManager)
	}
}

export { api }
