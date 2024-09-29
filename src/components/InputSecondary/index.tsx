import { TextInput, Text, View } from 'react-native'
import clsx from 'clsx'

type Props = {
	label?: string
	errorMessage?: string | null
	isInvalid?: boolean
	variant?: boolean
	className?: string
	inputClassName?: string
	[rest: string]: any // Permite passar propriedades adicionais
}

export function InputVariant({
	label,
	variant,
	errorMessage = null,
	isInvalid,
	className = '',
	inputClassName = '',
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<View className={clsx('mb-2', className)}>
			{label && (
				<Text className="font-medium text-sm mb-1 text-zinc-400">{label}</Text>
			)}

			<TextInput
				className={clsx(
					'bg-gray-50 px-2 py-2 rounded-lg text-sm',
					inputClassName,
					variant ? 'font-medium text-gray-500' : 'font-extrabold text-gray-500',
					invalid ? 'border-red-500 border' : 'border-gray-300 border',
					'focus:border-green-500 focus:bg-gray-50'
				)}
				autoCapitalize="none"
				placeholderTextColor="#00000030"
				{...rest}
			/>

			{invalid && (
				<Text className="text-red-500 text-xs mt-1">{errorMessage}</Text>
			)}
		</View>
	)
}
