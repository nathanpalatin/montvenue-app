import { View, Text, Pressable } from 'react-native'
import { Skeleton } from 'native-base'

import { ChevronLeft } from 'lucide-react-native'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from '@components/UserPhoto'

import { useAuth } from '@hooks/useAuth'
import { BlurView } from 'expo-blur'

type Props = {
	title?: string
	avatar?: string
	online?: boolean
	handlePressOption?: () => void
	secondOption?: boolean
}

export function ScreenHeader({
	secondOption,
	handlePressOption,
	title,
	online,
	avatar,
}: Props) {
	const { isLoadingUserStorageData } = useAuth()

	return (
		<BlurView className='z-50' intensity={60} tint='dark'>
			<View className="pt-20 pb-3 px-8 flex flex-row justify-between items-center">
				<Pressable onPress={handlePressOption}>
					<ChevronLeft size={28} color={'#ffffff90'} />
				</Pressable>

				{secondOption && (
					<View className="flex ml-3 flex-row gap-3 items-center">
						{isLoadingUserStorageData ? (
							<Skeleton
								w={8}
								fadeDuration={0.1}
								startColor={'gray.500'}
								endColor={'gray.700'}
								mr={'2'}
								h={8}
								rounded={'full'}
							/>
						) : (
							<UserPhoto
								source={
									avatar
										? { uri: avatar, cache: 'force-cache' }
										: defaultYUserPhotoImg
								}
								size={8}
								alt="Foto de perfil"
							/>
						)}
					</View>
				)}
				{online ? (
					<View className='flex flex-col'>
						<Text className="flex-1 text-center text-zinc-100 text-xl font-bold">
							{title}
						</Text>
						<Text className="flex-1 text-center text-green-800 text-xs  font-bold">
							online
						</Text>
					</View>
				) : (
					<Text className={`flex-1 ${secondOption ? 'text-left  ml-4' : 'text-center mr-6'} text-zinc-100 text-xl font-bold`}>
						{title}
					</Text>
				)}

			</View>
		</BlurView>
	)
}
