import { TextInput, Text, View } from 'react-native'
import clsx from 'clsx'

type Props = {
	errorMessage?: string | null
	isInvalid?: boolean
	className?: string
	inputClassName?: string
	variant?: boolean
	[rest: string]: any // Para passar props adicionais
}

export function Input({
	errorMessage = null,
	isInvalid,
	className = '',
	inputClassName = '',
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<View className={clsx('mb-4', className)}>
			<TextInput
				className={clsx(
					'bg-gray-900 px-1 py-4 rounded-sm text-sm text-gray-100',
					inputClassName,
					'border-b',
					invalid ? 'border-red-500' : 'border-gray-600',
					'focus:border-indigo-500'
				)}
				autoCapitalize="none"
				placeholderTextColor={'#00000040'}
				{...rest}
			/>
			{invalid && (
				<Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
			)}
		</View>
	)
}
