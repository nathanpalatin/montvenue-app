import { api } from './api'

export const getFeed = async () => {
	const res = await api.get('/posts')
	return res
}
