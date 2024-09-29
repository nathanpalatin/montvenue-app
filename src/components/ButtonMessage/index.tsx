import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  variant?: 'outline' | 'solid'
  onSend?: (text: string) => void
}

export function ButtonMessage({ children, variant = 'solid', ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`w-8 h-8 rounded-full flex items-center justify-center ${variant === 'outline'
        ? 'bg-gray-800 border border-indigo-900'
        : 'bg-indigo-700'
        }`}
      activeOpacity={0.7}
      {...rest}
    >
      <Text className={`${variant === 'outline' ? 'text-indigo-900' : 'text-white'}`}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
