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

export function ButtonList({ isLoading, variant, title, ...rest }: Props) {
  const buttonClasses = `
self-center rounded-2xl 
  ${variant === 'outline' ? 'bg-zinc-600' : 'bg-zinc-700'}`

  return (
    <TouchableOpacity className={buttonClasses} {...rest}>
      <Text
        className={`text-lg font-semibold text-center p-3  ${variant === 'outline' ? 'bg-zinc-600' : 'bg-zinc-700'}`}
      >
        {isLoading ? (
          <ActivityIndicator
            className="p-px"
            size={'small'}
            color={'bg-zinc-100'}
          />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  )
}
