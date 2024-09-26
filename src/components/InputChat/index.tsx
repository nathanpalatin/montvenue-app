import { IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
  value: string
}

export function InputChat({ value, ...rest }: Props) {
  return (
    <NativeBaseInput
      mr={value.length > 0 ? '2' : '0'}
      placeholder="Envie uma mensagem..."
      value={value}
      flex={1}
      px={4}
      py={4}
      bg={'gray.900'}
      _focus={{
        bg: 'gray.900',
        borderColor: 'lime.700',
        borderWidth: 0.4
      }}
      color={'gray.100'}
      rounded={'lg'}
      returnKeyType="send"
      borderWidth={0}
      {...rest}
    />
  )
}