import { TextInput, View } from 'react-native'
import clsx from 'clsx'

type Props = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  [rest: string]: any
}

export function InputChat({ value, onChangeText, placeholder = "Envie uma mensagem...", ...rest }: Props) {
  return (
    <TextInput
      className={clsx(
        'flex-1 bg-gray-900 text-gray-100 px-4 py-4 rounded-lg',
        value.length > 0 ? 'mr-2' : 'mr-0'
      )}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#00000040"
      returnKeyType="send"
      {...rest}
    />
  )
}
