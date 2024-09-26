import { useState } from 'react'
import {
	Pressable,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { AppError } from '@utils/AppError'
import { FormDataEmailProps } from '@dtos/forms'


export function ForgetPassword() {

	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataEmailProps>()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	async function handleFormSubmit({ email }: FormDataEmailProps) {
		try {
			setIsLoading(true)
			//await forgotPassowrd(email)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? 'Credenciais inválidas.'
				: 'Erro no servidor, tente novamente mais tarde.'

			toast.show({
				title,
				placement: 'bottom',
				bgColor: 'red.800',
				borderRadius: 8,
				marginBottom: 100,
			})

			setIsLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView
			className="flex-1 bg-zinc-900"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-50}
		>

			<View className="flex-1 justify-center px-10 py-20">
				<View className="flex-grow  justify-center items-center rounded-lg pt-10 ">
					<Text className='text-center text-white text-xl mb-4 font-bold'>Recuperar acesso</Text>

					<Controller
						control={control}
						name="email"
						rules={{ required: 'E-mail inválido' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="seu e-mail ou nome de usuário"
								keyboardAppearance="dark"

								placeholderTextColor={'#ffffff47'}
								onChangeText={onChange}
								errorMessage={errors.email?.message}
							/>
						)}
					/>


					<Pressable
						onPress={() => navigation.navigate('signIn')}
						className="w-full"
					>
						<Text className="  text-zinc-100 text-right">
							Lembrou a senha? <Text className='font-bold'>Entrar</Text>
						</Text>
					</Pressable>
				</View>

				<Button
					title="Enviar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={handleSubmit(handleFormSubmit)}
				/>



			</View>
		</KeyboardAvoidingView>
	)
}
