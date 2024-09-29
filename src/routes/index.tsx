import { useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { AppLoading } from '@components/AppLoading'
import { theme } from '@utils/theme'

const linking = {
	prefixes: ['zapsales://', 'com.zapsales://'],
	config: {
		screens: {
			chat: {
				path: "/chat/:userId",
				parse: {
					userId: (userId: string) => userId
				}
			}
		}
	}
}

export function Routes() {

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})

	const { user } = useAuth()

	const [isAppReady, setAppReady] = useState(false)
	useEffect(() => {
		const prepareApp = async () => {
			if (fontsLoaded) {
				await new Promise(resolve => setTimeout(resolve, 1600))
				setAppReady(true)
			}
		}

		prepareApp()
	}, [fontsLoaded])


	if (!isAppReady) {
		return <AppLoading />
	}

	return (
		<View className="flex-1 bg-zinc-950">
			<StatusBar barStyle={'light-content'} />
			<NavigationContainer linking={linking} theme={theme}>
				{user.id ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</View>
	)
}
