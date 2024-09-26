import { api } from './api'

export const sendPhotoProfile = async (file: FormData) => {
	const res = await api.post('/users/avatar', file)
	return res
}

export const getPhotoProfile = async () => {
	const res = await api.get('/upload')
	return res
}

export const updatePhotoProfile = async (file: FormData) => {
	const res = await api.patch('/upload', file)
	return res
}

export const removePhotoProfile = async () => {
	const res = await api.delete('/upload')
	return res
}

export const getDaily = async () => {
	const res = await api.get('/best-daily-performers')
	return res
}
export const getWorst = async () => {
	const res = await api.get('/worst-daily-performers')
	return res
}
export const getRecently = async () => {
	const res = await api.get('/recently-turned-bullish')
	return res
}

export const getRecently2 = async () => {
	const res = await api.get('/recently-turned-bearish')
	return res
}
