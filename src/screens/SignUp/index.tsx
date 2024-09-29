import { useState } from 'react'
import {
	Pressable,
	Text,
	View,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation, useTheme } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { TextInputMask } from 'react-native-masked-text'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { storageRegisterUserSave } from '@storage/storageUser'
import { validateCPF } from '@utils/functions'
import { XIcon } from 'lucide-react-native'
import { style } from './style'


type FormDataProps = {
	name: string
	cpf: string
	birthdate: string
}


const signUpSchema = yup.object({
	name: yup.string().required('Campo obrigatório.'),
	cpf: yup
		.string()
		.required('Campo obrigatório.')
		.test('cpf-valid', 'CPF inválido.', (value) => validateCPF(value || '')),
	birthdate: yup
		.string()
		.required('Campo obrigatório.')
		.test('is-18-or-older', 'Você precisa ter 18 anos ou mais.', (value) => {
			if (!value) return false;

			const [day, month, year] = value.split('/');
			const birthdate = new Date(`${year}-${month}-${day}`);
			const today = new Date();
			const age = today.getFullYear() - birthdate.getFullYear();

			const isMonthBefore = today.getMonth() < birthdate.getMonth();
			const isDayBefore =
				today.getMonth() === birthdate.getMonth() &&
				today.getDate() < birthdate.getDate();

			if (isMonthBefore || isDayBefore) {
				return age - 1 >= 18;
			}
			return age >= 18;
		}),
})


export function SignUp() {

	const theme = useTheme()

	const [isLoading, setIsLoading] = useState(false)
	const [cpfFocused, setCpfFocused] = useState(false)
	const [birthdateFocused, setBirthdateFocused] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
	})

	async function handleSignUp({ name, cpf, birthdate }: FormDataProps) {
		try {
			setIsLoading(true)

			await storageRegisterUserSave({ name, cpf, birthdate })

			navigation.navigate('signUp2', {
				name: name,
				cpf: cpf,
				birthdate: birthdate,
			})

		} catch (error) {
			console.log(error)
			setIsLoading(false)
			const isAppError = error instanceof AppError
			const title = isAppError ? error.message : 'Error creating account'

		}
	}
	return (
		<KeyboardAvoidingView
			className="flex-grow bg-zinc-900"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-60}
		>
			<View
				className="flex-1 h-screen px-8 pb-20"
			>
				<Pressable
					onPress={() => navigation.navigate('signIn')}
					className="mt-24"
				>
					<XIcon size={32} color={'white'} />
				</Pressable>
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
								fontSize={18}
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
						name="cpf"
						render={({ field: { onChange, value } }) => (
							<>
								<TextInputMask
									type={'cpf'}
									value={value}
									onChangeText={onChange}
									placeholder="CPF"
									keyboardAppearance="dark"
									keyboardType="number-pad"
									placeholderTextColor={'#ffffff79'}
									style={[
										style.inputMaskDate,
										{ borderBottomColor: cpfFocused ? theme.colors.primary : '#4d4d4d' },
									]}
									onFocus={() => setCpfFocused(true)}
									onBlur={() => setCpfFocused(false)}
								/>
								{errors.cpf && (
									<Text className='text-red-500'>
										{errors.cpf?.message}
									</Text>
								)}
							</>
						)}
					/>

					<Controller
						control={control}
						name="birthdate"
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
								style={[
									style.inputMaskDate,
									{ borderBottomColor: birthdateFocused ? theme.colors.primary : '#4d4d4d' },
								]}
								onFocus={() => setBirthdateFocused(true)}
								onBlur={() => setBirthdateFocused(false)}
							/>
						)}
					/>

				</View>

				<Button
					title="Avançar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={handleSubmit(handleSignUp)}
				/>
			</View>
		</KeyboardAvoidingView>
	)
}


