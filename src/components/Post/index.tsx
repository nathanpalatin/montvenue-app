import { useState } from 'react'
import { View, Text, Image, Pressable, FlatList } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { UserPhoto } from '@components/UserPhoto'
import { Skeleton } from '@components/Loading'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import br from 'dayjs/locale/pt-br'

import Video from 'react-native-video'

dayjs.extend(relativeTime)
dayjs.locale(br)

type Media = {
	id: string;
	source: string;
	type: 'POST' | 'VIDEO';
};


import { PostProps } from '@dtos/PostDTO'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

export function Post({
	liked,
	comments,
	isMuted,
	loading,
	item
}: PostProps) {
	const [like, setLike] = useState(liked)

	if (loading) {
		return <Skeleton className="w-36 h-4 bg-black" />
	}

	const renderMedia = ({ item }: { item: Media }) => {
		if (item.type === 'VIDEO') {
			return (
				<Video
					source={{ uri: item.source }}
					className='w-full h-[600px]'
					muted={isMuted}
				/>
			)
		} else {
			return (
				<Image
					source={{ uri: item.source, cache: 'force-cache' }}
					className='w-full h-[500px] object-cover'
				/>
			)
		}
	}

	return (
		<View className="my-6">
			<View className="flex flex-row px-6 items-start">
				<UserPhoto
					source={
						item.user.avatar
							? { uri: item.user.avatar, cache: 'force-cache' }
							: defaultYUserPhotoImg
					}
					size={9}
				/>
				<View className="ml-3">
					<Text className="text-sm font-medium text-zinc-500">
						{item.user.name}
					</Text>
					<Text className="text-xs text-zinc-500 font-light">{dayjs(item.createdAt).fromNow()}</Text>
				</View>
			</View>
			<Text className="font-medium px-8 py-3 text-xs text-zinc-400">
				{item.title}
			</Text>

			{item.medias && item.medias.length > 1 ? (
				<FlatList
					data={item.medias}
					horizontal
					keyExtractor={(media, index) => index.toString()}
					renderItem={renderMedia}
					showsHorizontalScrollIndicator={false}
				/>
			) : (
				renderMedia({ item: item.medias[0] })
			)}

			<View className="flex flex-row px-6 mt-3">
				<Pressable className="mr-2" onPress={() => setLike(!like)}>
					{like ? (
						<Entypo name="heart" color={'red.700'} size={26} />
					) : (
						<Entypo name="heart-outlined" color={'white'} size={26} />
					)}
				</Pressable>
				<Pressable onPress={() => { }}>
					<Entypo name="message" color={'white'} size={26} />
				</Pressable>
			</View>
			<View className="px-6 mt-2">
				<Text className="text-xs text-zinc-500 font-medium">
					<Text className="font-bold text-white">{item.user.username}</Text> {item.content}
				</Text>
				<Text className="text-xs text-zinc-500 font-medium">
					{comments} comentários
				</Text>
			</View>
		</View>
	)
}
