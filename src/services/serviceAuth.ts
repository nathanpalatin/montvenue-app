import { UserDTO } from '@dtos/UserDTO'
import { api } from './api'

interface ResponseAuth {
	token: string
	refreshToken: string
	user: UserDTO
}

export const login = async (credential: string, password: string) => {
	const res = await api.post<ResponseAuth>('/users/login', { credential, password })
	return res
}

export const registerUser = async (name: string, email: string, phone: string, password: string) => {
	const res = await api.post('/users', {
		name,
		email,
		phone,
		password
	})
	return res
}
