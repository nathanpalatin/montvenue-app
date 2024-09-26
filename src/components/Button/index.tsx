import {
	ActivityIndicator,
	ButtonProps,
	Text,
	TouchableOpacity,
} from 'react-native'

interface Props extends ButtonProps {
	variant: 'outline' | 'solid'
	isLoading?: boolean
}

export function Button({ isLoading, variant, title, ...rest }: Props) {
	const buttonClasses = `self-center rounded-full w-full ${variant === 'outline' ? 'bg-primary' : 'bg-secondary'}`

	return (
		<TouchableOpacity className={buttonClasses} {...rest}>
			{isLoading ? (
				<ActivityIndicator className='p-4' />
			) : (
				<Text className={`text-lg font-semibold text-center p-3 text-secondary`}>
					{title}
				</Text>
			)}

		</TouchableOpacity>
	)
}
