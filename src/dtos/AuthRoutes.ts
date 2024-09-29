export type AuthRoutesTypes = {
	welcome: undefined
	signIn: undefined
	signUp: undefined
	signUp2: { name: string; cpf: string; birthdate: string }
	pricing: undefined
	resetPassword: undefined
	forgetPassword: undefined
	completeAccount: { phone: string }
}
