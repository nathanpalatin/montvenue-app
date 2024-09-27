import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE, USER_REGISTER_STORAGE } from '@storage/storageConfig'

import { UserDTO, UserRegisterDTO } from '@dtos/UserDTO'

export async function storageUserSave(user: UserDTO) {
	await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function updateAvatarInStorage(newAvatar: string) {
	const userJSON = await AsyncStorage.getItem(USER_STORAGE)
	if (userJSON !== null) {
		const user = JSON.parse(userJSON)
		user.avatar = newAvatar
		await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
	}
}

export async function storageUserGet() {
	const storage = await AsyncStorage.getItem(USER_STORAGE)

	const user: UserDTO = storage ? JSON.parse(storage) : {}

	return user
}

export async function storageUserRemove() {
	await AsyncStorage.removeItem(USER_STORAGE)
}

export async function storageRegisterUserSave(user: UserRegisterDTO) {
	await AsyncStorage.setItem(USER_REGISTER_STORAGE, JSON.stringify(user))
}

export async function storageRegisterUserGet() {
	const storage = await AsyncStorage.getItem(USER_REGISTER_STORAGE)

	const user: UserRegisterDTO = storage ? JSON.parse(storage) : {}

	return user
}

export async function storageClear() {
	await AsyncStorage.clear()
}
