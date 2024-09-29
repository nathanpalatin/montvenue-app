import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRoutesTypes } from '@dtos/AppRoutes'
import { Notifications } from '@screens/Notifications'
import TabRoutes from './tabs.routes'
import { Logged } from '@screens/Logged'
export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesTypes>

const { Navigator, Screen, Group } = createNativeStackNavigator<AppRoutesTypes>()

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="logged"
		>
			<Screen name="home" component={TabRoutes} />
			<Group>
				<Screen name="logged" component={Logged} />
				<Screen name="notifications" component={Notifications} />
			</Group>
		</Navigator>
	);
}
