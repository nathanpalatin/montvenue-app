import { FlatList, View } from 'react-native'

import { Header } from '@components/Header'
import { ChatUser } from '@components/ChatUser'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Chats() {

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	const chats = [
		{
			username: 'nathanpalatin',
			name: 'Nathan Palatin',
			image: 'https://randomuser.me/api/portraits/men/97.jpg',
			id: '1',
		},
		{
			username: 'johnacme',
			name: 'John Acme',
			image: 'https://randomuser.me/api/portraits/men/96.jpg',
			id: '2',
		},
		{
			username: 'ismaeleliper',
			name: 'Ismael Eliper',
			image: 'https://github.com/ismaeleliper.png',
			id: '3',
		}
	]

	return (
		<View className='flex-1 bg-zinc-900'>
			<Header
				title="Mensagens"
			/>
			<FlatList
				data={chats}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return <ChatUser {...item}
						onPress={() => navigation.navigate('chat')}
					/>
				}}
			/>

		</View>
	)
}
