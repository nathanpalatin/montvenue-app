import { ScreenHeader } from '@components/ScreenHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { BellDotIcon, User2Icon } from 'lucide-react-native'
import { View, Text, Pressable } from 'react-native'

export function Settings() {
	const navigation = useNavigation<AppNavigatorRoutesProps>()
	return (
		<>
			<ScreenHeader
				title="Configurações"
				handlePressOption={() => navigation.goBack()}
			/>
			<View className="flex-1 bg-zinc-900 justify-start items-start p-10">

				<View className=" flex-col justify-between gap-3">
					<Pressable className="flex items-center " onPress={() => navigation.navigate('editProfile')}>
						<View className="flex flex-row gap-3 items-center">
							<User2Icon color={'#fff'} />
							<Text className="text-zinc-100">Minha conta</Text>
						</View>
					</Pressable>
					<Pressable className=" items-center " onPress={() => navigation.navigate('stories')}>
						<View className="flex flex-row gap-3 items-center">
							<BellDotIcon color={'#fff'} />
							<Text className="text-zinc-100">Notificações</Text>
						</View>
					</Pressable>
				</View>
			</View>
		</>
	)
}
