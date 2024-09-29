import { Text, View, Pressable, Image } from 'react-native'
import { useAuth } from '@hooks/useAuth'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'
import { MenuIcon } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type Props = {
	handlePressOption?: () => void
}

export function HomeHeader({ handlePressOption }: Props) {
	const { user, isLoadingUserStorageData } = useAuth()
	const navigation = useNavigation<AppNavigatorRoutesProps>()

	return (
		<View className="flex flex-row items-center bg-zinc-900 pt-20 pb-4 px-6">
			{isLoadingUserStorageData ? (
				<View className="w-8 h-8 bg-gray-500 rounded-full mr-2" />
			) : (
				<Pressable onPress={() => { }}>
					<Image
						source={
							user.avatar
								? { uri: user.avatar, cache: 'force-cache' }
								: defaultYUserPhotoImg
						}
						className="w-8 h-8 rounded-full mr-2"
						resizeMode="cover"
					/>
				</Pressable>
			)}

			<View className="flex-1">
				<Text className="text-zinc-100 text-xs">Olá,</Text>
				<Text className="text-zinc-50 text-sm">{user.name}</Text>
			</View>

			<View className="flex flex-row gap-6">
				<Pressable onPress={handlePressOption}>
					<MenuIcon color={'#fff'} size={24} />
				</Pressable>
			</View>
		</View>
	)
}
