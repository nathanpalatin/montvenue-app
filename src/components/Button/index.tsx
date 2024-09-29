import {
	ActivityIndicator,
	ButtonProps,
	Text,
	TouchableOpacity,
} from 'react-native'
import clsx from 'clsx'

interface Props extends ButtonProps {
	variant: 'outline' | 'solid'
	isLoading?: boolean
	className?: string
	textClassName?: string
	loadingClassName?: string
}

export function Button({
	isLoading,
	variant,
	title,
	className = '',
	textClassName = '',
	loadingClassName = 'p-4',
	...rest
}: Props) {
	return (
		<TouchableOpacity
			className={clsx(
				'self-center rounded-full w-full',
				className,
			)}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator className={loadingClassName} />
			) : (
				<Text
					className={clsx(
						'text-lg font-semibold text-center p-3',
						textClassName

					)}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}
