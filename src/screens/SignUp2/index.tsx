import { useState } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { TextInputMask } from 'react-native-masked-text'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { storageRegisterUserSave } from '@storage/storageUser'
import { useToast } from '@components/Toast'


type FormDataProps = {
	phone: string
}


const signUpSchema = yup.object({
	phone: yup
		.string()
		.required('Campo obrigatório.'),
})

export function SignUpTwo() {
	const toast = useToast()

	const route = useRoute()

	const params = route.params as { name: string, cpf: string, birthdate: string }

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
	})

	async function handleSignUp({ phone }: FormDataProps) {
		try {
			setIsLoading(true)

			const updatedData = ((params.name, params.cpf, params.birthdate, phone))

			await storageRegisterUserSave(updatedData)
			3

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
			keyboardVerticalOffset={200}
		>

			<ScrollView
				className="h-screen px-8 pb-20"
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<View className=" flex-1 justify-center  rounded-2xl pt-10">
					<Text className='text-left text-zinc-400 text-xl mb-4 font-bold'>PASSO 2 DE 3</Text>
					<Text className='text-left text-white text-xl mb-4 font-bold'>Informações pessoais</Text>
					<Text className='text-left text-zinc-400 text-sm mb-4'>Informe seu número de telefone para aumentar a segurança em suas autenticações.</Text>

					<Controller
						control={control}
						name="phone"
						render={({ field: { onChange, value } }) => (
							<>
								<TextInputMask
									type="cel-phone"
									value={value}
									onChangeText={onChange}
									placeholder="Telefone"
									keyboardAppearance="dark"
									keyboardType="number-pad"
									placeholderTextColor={'#ffffff79'}
									style={style.inputMaskDate}
								/>
								{errors.phone && (
									<Text style={{ color: 'red', marginBottom: 10 }}>
										{errors.phone?.message}
									</Text>
								)}
							</>
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
		fontSize: 32,
		color: '#ffffff',
		borderBottomWidth: 1,
		borderBottomColor: '#4d4d4d',
	},
})
