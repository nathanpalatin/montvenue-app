import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRoutesTypes } from '@dtos/AppRoutes'
import { EditProfile } from '@screens/EditProfile'
import { Settings } from '@screens/Settings'
import { Notifications } from '@screens/Notifications'
import { Chat } from '@screens/Chat'
import TabRoutes from './tabs.routes'
import { Stories } from '@screens/Stories'
export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesTypes>

const { Navigator, Screen, Group } = createNativeStackNavigator<AppRoutesTypes>()

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="home"
		>
			<Screen name="home" component={TabRoutes} />
			<Group>
				<Screen name="editProfile" component={EditProfile} />
				<Screen name="chat" component={Chat} />
				<Screen name="stories" component={Stories} />
				<Screen name="notifications" component={Notifications} />
				<Screen name="settings" component={Settings} />
			</Group>
		</Navigator>
	);
}
