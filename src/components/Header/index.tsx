import { View, Text } from 'react-native'
import { BlurView } from 'expo-blur'

type Props = {
	title?: string
}

export function Header({
	title
}: Props) {

	return (
		<BlurView className='z-50' intensity={60} tint='dark'>
			<View className="pt-20 pb-4 flex flex-row justify-center items-center">
				<Text className="flex-1 text-center text-zinc-100 text-xl font-bold">
					{title}
				</Text>
			</View>
		</BlurView>
	)
}
