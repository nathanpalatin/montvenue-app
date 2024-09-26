import { useState } from 'react'
import {
	Pressable,
	Text,
	View,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { TextInputMask } from 'react-native-masked-text'
import { useToast } from 'native-base'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useAuth } from '@hooks/useAuth'

import { registerUser } from '@services/serviceAuth'

type FormDataProps = {
	name: string
	email: string
	phone: string
	password: string
	passwordConfirm: string
}


const signUpSchema = yup.object({
	name: yup.string().required('Campo obrigatório.'),
	phone: yup.string().required('Campo obrigatório.'),
	email: yup.string().required('Campo obrigatório.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Campo obrigatório.')
		.min(6, 'Sua senha deve ter no mínimo 6 caractéres.'),
	passwordConfirm: yup
		.string()
		.required('Confirme sua senha.')
		.oneOf([yup.ref('password')], 'A senha não confere.'),
})

export function SignUp() {
	const toast = useToast()


	const { singIn } = useAuth()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
	})

	async function handleSignUp({ name, email, phone, password }: FormDataProps) {
		try {
			setIsLoading(true)
			await registerUser(name, email, phone, password)
			await singIn(email, password)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			const isAppError = error instanceof AppError
			const title = isAppError ? error.message : 'Error creating account'
			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
		}
	}
	return (
		<KeyboardAvoidingView
			className="flex-grow bg-zinc-900"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={200}
		>

			<ScrollView
				className="h-screen px-8 pb-20"
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<View className=" flex-1 justify-center  rounded-2xl pt-10">
					<Text className='text-left text-zinc-400 text-xl mb-4 font-bold'>PASSO 1 DE 3</Text>
					<Text className='text-left text-white text-xl mb-4 font-bold'>Informações pessoais</Text>
					<Text className='text-left text-zinc-400 text-sm mb-4'>Essas informações são necessárias para garantir a sua segurança, evitando fraudes.</Text>

					<Controller
						control={control}
						name="name"
						rules={{ required: 'Campo obrigatório' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Nome completo"
								keyboardAppearance='dark'
								onChangeText={onChange}
								placeholderTextColor={'#ffffff79'}
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						rules={{
							required: 'Campo obrigatório.',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'E-mail inválido.',
							},
						}}
						render={({ field: { onChange, value } }) => (
							<TextInputMask
								type={'cpf'}
								value={value}
								onChangeText={onChange}
								placeholder="CPF"
								keyboardAppearance="dark"
								keyboardType="number-pad"
								placeholderTextColor={'#ffffff79'}
								style={style.inputMaskDate}
							/>
						)}
					/>

					<Controller
						control={control}
						name="phone"
						rules={{ required: 'Data de nascimento obrigatória.' }}
						render={({ field: { onChange, value } }) => (
							<TextInputMask
								type={'datetime'}
								options={{

									format: 'DD/MM/YYYY',
								}}
								value={value}
								onChangeText={onChange}
								placeholder="Data de nascimento"
								keyboardAppearance="dark"
								keyboardType="number-pad"
								placeholderTextColor={'#ffffff79'}
								style={style.inputMaskDate}
							/>
						)}
					/>




				</View>

				<Pressable
					onPress={() => navigation.navigate('signIn')}
					className="mb-10 self-center flex items-center gap-2"
				>
					<Text className=" text-zinc-50">
						Já tem conta?{' '}
						<Text className="text-50 font-bold">Acessar</Text>
					</Text>
				</Pressable>
				<Button
					title="Avançar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={handleSubmit(handleSignUp)}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const style = StyleSheet.create({
	inputMaskDate: {
		paddingHorizontal: 5,
		paddingVertical: 15,
		width: '100%',
		marginBottom: 15,
		fontSize: 13,
		color: '#ffffff',
		borderBottomWidth: 1,
		borderBottomColor: '#4d4d4d',
	},
})
