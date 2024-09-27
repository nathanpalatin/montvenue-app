export type UserDTO = {
	id: number
	name: string
	email: string
	phone?: string
	avatar?: string
}

export type UserRegisterDTO = {
	name: string
	cpf: string
	birthdate: string
}
