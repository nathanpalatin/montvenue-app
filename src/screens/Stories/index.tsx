import { View, Text, Image } from 'react-native'

import Ring from './components/Ring'
import { Vibration } from 'react-native'
import { useEffect } from 'react'

export function Stories() {

	const ONE_SECOND_IN_MS = 1000

	const PATTERN = [
		1 * ONE_SECOND_IN_MS,
		2 * ONE_SECOND_IN_MS,
		3 * ONE_SECOND_IN_MS,
	]

	useEffect(() => {
		Vibration.vibrate(PATTERN)
	}, [])

	return (
		<View className="bg-zinc-950 flex-1 justify-center items-center">
			<View>
				{[...Array(15).keys()].map((_, index) => (
					<Ring key={index} index={index} />
				))}
				<Image
					alt="pr"
					source={require('@assets/userPhotoDefault.png')}
					className="w-56 h-56 rounded-full"
				/>
			</View>
			<Text className="mt-10 text-xl text-zinc-50 font-bold">
				Nathan está ligando...
			</Text>
		</View>
	)
}
