import { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import Modal from 'react-native-modal'

import { HomeHeader } from '@components/HomeHeader'
import { useAuth } from '@hooks/useAuth'
import { LogOutIcon, SettingsIcon } from 'lucide-react-native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useNavigation } from '@react-navigation/native'

import useFeed from '@globalstates/feed.zustand'

import { Post } from '@components/Post'

export function Home() {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const { signOut } = useAuth()

	const [visibleItems, setVisibleItems] = useState<any[]>([])
	const viewabilityConfig = { itemVisiblePercentThreshold: 50 }

	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
		setVisibleItems(viewableItems.map((item) => item.item.id))
	})

	const { feedList, initializeFeed, loadingFeed } = useFeed()

	useEffect(() => {
		initializeFeed()
	}, [])

	const navigation = useNavigation<AppNavigatorRoutesProps>()
	return (
		<>
			<View className="flex-1">
				<HomeHeader handlePressOption={() => setOpenModal(true)} />
				<FlatList
					data={feedList}
					renderItem={({ item }) => (
						<Post
							liked={false}
							comments={10}
							loading={loadingFeed}
							item={item}
							isMuted={!visibleItems.includes(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					onViewableItemsChanged={onViewableItemsChanged.current}
					viewabilityConfig={viewabilityConfig}
				/>
			</View>
			<Modal
				isVisible={openModal}
				animationIn="slideInRight"
				animationOut="slideOutRight"
				backdropColor="#000000aa"
				backdropOpacity={1}
				animationInTiming={500}
				animationOutTiming={500}
				style={{ margin: 0, padding: 0, justifyContent: 'flex-end' }}
				onBackdropPress={() => setOpenModal(!openModal)}
			>
				<View className="bg-zinc-900 absolute right-0 w-96 h-screen pt-4 pb-16 px-10">
					<View className="mt-20 flex flex-col gap-3">
						<Pressable
							onPress={() => {
								setOpenModal(!openModal)
								setTimeout(() => {
									navigation.navigate('settings')
								}, 400)
							}}
						>
							<View className='flex flex-row items-center gap-3'>
								<SettingsIcon color={'white'} size={20} />
								<Text className="text-white font-bold">Configurações</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() => {
								setOpenModal(!openModal)
								setTimeout(async () => {
									await signOut()
								}, 400)
							}}
						>
							<View className='flex flex-row items-center gap-3'>
								<LogOutIcon color={'white'} size={20} />
								<Text className="text-white font-bold">Sair</Text>
							</View>
						</Pressable>
					</View>
				</View>
			</Modal>
		</>
	)
}
