import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
	errorMessage?: string | null
	variant?: boolean
}

export function Input({
	variant,
	errorMessage = null,
	isInvalid,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<FormControl isInvalid={invalid} mb={'4'}>
			<NativeBaseInput
				bg={'gray.900'}
				px={1}
				py={4}
				autoCapitalize={'none'}
				rounded={'sm'}
				fontSize="sm"
				color={'gray.100'}
				placeholderTextColor={'#00000040'}
				isInvalid={invalid}
				borderBottomColor={'gray.600'}
				borderLeftWidth={0}
				borderTopWidth={0}
				borderRightWidth={0}
				borderBottomWidth={1}
				_invalid={{
					borderBottomWidth: 2,
					borderColor: 'red.500',
				}}
				_focus={{
					bg: 'gray.900',
					borderBottomColor: 'indigo.500',
				}}
				{...rest}
			/>
			<FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
		</FormControl>
	)
}
