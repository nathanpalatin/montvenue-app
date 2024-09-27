import { Text } from 'react-native'

interface ScreenProps {
  item: {
    id: number
    title: string
    description: string
    image: string
  }
}


export function OnboardScreen({ item }: ScreenProps) {
  return (
    <>
      <Text className='text-white text-2xl'>{item.title}</Text>
      <Text className='text-white text-6xl font-semibold'>{item.description}</Text>
    </>
  )
}