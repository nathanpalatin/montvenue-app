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


import { Controller, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { ButtonPassword } from '@components/ButtonPassword'
import { FormDataProps } from '@dtos/forms'
import { TextInputMask } from 'react-native-masked-text'
import { style } from './style'


export function SignIn() {

	const { singIn } = useAuth()

	const [showPass, setShowPass] = useState(true)
	const [cpfFocused, setCpfFocused] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	async function handleSignIn({ credential, password }: FormDataProps) {
		try {
			setIsLoading(true)
			await singIn(credential, password)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? 'Credenciais inválidas.'
				: 'Erro no servidor, tente novamente mais tarde.'

			setIsLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView
			className="flex-1 bg-zinc-900"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-120}
		>
			<View className="flex-1 justify-center px-10 py-20">
				<View className="flex-grow justify-center  pt-10 ">
					<Text className='text-left text-white text-xl mb-4 font-bold'>Acessar sua conta</Text>
					<Text className='text-left text-zinc-400 text-sm mb-4'>Utilize os campos abaixo para inserir seus dados de acesso e prossiga.</Text>
					<Controller
						control={control}
						name="credential"
						rules={{ required: 'Credencial inválida' }}
						render={({ field: { onChange, value } }) => (
							<TextInputMask
								type='cpf'
								value={value}
								placeholder="Insira seu CPF"
								keyboardAppearance="dark"
								placeholderTextColor={'#ffffff47'}
								onChangeText={onChange}
								style={[
									style.inputMaskDate,
									{ borderBottomColor: cpfFocused ? theme.colors.indigo[500] : '#4d4d4d' },
								]}
								onFocus={() => setCpfFocused(true)}
								onBlur={() => setCpfFocused(false)}
							/>
						)}
					/>
					{errors.credential && (
						<Text className='text-red-500'>
							{errors.credential?.message}
						</Text>
					)}
					<Controller
						control={control}
						name="password"
						rules={{ required: 'Senha inválida' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Senha"
								onChangeText={onChange}
								returnKeyType="send"
								onSubmitEditing={handleSubmit(handleSignIn)}

								InputRightElement={
									<ButtonPassword
										show={showPass}
										onPress={() => setShowPass(!showPass)}
									/>
								}
								placeholderTextColor={'#ffffff56'}
								keyboardAppearance="dark"
								secureTextEntry={showPass}
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Pressable
						onPress={() => navigation.navigate('forgetPassword')}
						className="w-full"
					>
						<Text className="  text-zinc-100 text-right font-bold">
							Esqueceu a senha?
						</Text>
					</Pressable>
				</View>
				<Button
					title="Entrar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={handleSubmit(handleSignIn)}
				/>
				<Pressable
					className="mt-10 mb-4"
					onPress={() => navigation.navigate('signUp')}
				>
					<Text className=" text-zinc-100 font-bold text-center">
						Criar nova conta
					</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	)
}
