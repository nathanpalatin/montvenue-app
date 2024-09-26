import { useState } from 'react'
import {
	View,
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
import { FormDataCodeProps } from '@dtos/forms'


export function ResetPassword() {

	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataCodeProps>()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	async function handleFormSubmit({ code }: FormDataCodeProps) {
		try {
			setIsLoading(true)
			//await forgotPassowrd(email)
			navigation.navigate('welcome')
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? 'Código inválido.'
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
					<Controller
						control={control}
						name="code"
						rules={{ required: 'Campo obrigatório' }}
						render={({ field: { onChange } }) => (
							<Input
								keyboardAppearance="dark"
								maxLength={4}
								fontWeight={'extrabold'}
								fontSize={40}
								keyboardType='numeric'
								className='text-center border '
								placeholderTextColor={'#ffffff47'}
								onChangeText={onChange}
								errorMessage={errors.code?.message}
							/>
						)}
					/>



				</View>

				<Button
					title="Avançar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={handleSubmit(handleFormSubmit)}
				/>



			</View>
		</KeyboardAvoidingView>
	)
}
