import { EyeIcon, EyeOffIcon } from 'lucide-react-native'

interface ButtonPassProps {
  onPress: () => void
  show: boolean
}

export function ButtonPassword({ onPress, show }: ButtonPassProps) {
  return (
    <>
      {show ? (
        <EyeOffIcon size={24}
          color={'white'}
          style={{ marginHorizontal: 20, opacity: 0.8 }}
          onPress={onPress}
        />
      ) : (
        <EyeIcon size={24}
          color={'gray'}
          style={{ marginHorizontal: 20, opacity: 1 }}
          onPress={onPress}
        />
      )}

    </>
  )
}