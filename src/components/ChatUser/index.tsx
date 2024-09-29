import { TouchableOpacity, TouchableOpacityProps, Text, View, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import clsx from 'clsx'

import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

type Props = TouchableOpacityProps & {
	name: string
	image: string
	username: string
}

export function ChatUser({ name, username, image, ...rest }: Props) {
	return (
		<TouchableOpacity {...rest}>
			<View className="flex-row bg-gray-800 p-4 items-center border-b border-gray-600">
				<Image
					source={
						image ? { uri: image, cache: 'force-cache' } : defaultYUserPhotoImg
					}
					className="w-10 h-10 rounded-full mr-3 ml-2"
					resizeMode="cover"
				/>

				<View className="flex-1">
					<Text className="text-sm font-semibold text-white">{name}</Text>
					<Text className="text-xs text-gray-300">@{username}</Text>
				</View>

				<View className="bg-red-700 mr-2 rounded-full">
					<Text className="text-xs font-bold text-white text-center p-2">1</Text>
				</View>

				<Entypo name="chevron-thin-right" size={16} color="gray" />
			</View>
		</TouchableOpacity>
	)
}
