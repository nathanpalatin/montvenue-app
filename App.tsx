import { useEffect } from 'react'
import { NativeBaseProvider } from 'native-base'

import 'react-native-gesture-handler'
import 'react-native-reanimated'

import './global.css'

import { THEME } from './src/theme'

import { Routes } from './src/routes'

import { SocketProvider } from '@contexts/socket'
import { AuthContextProvider } from '@contexts/AuthContext'

import { getPermissions } from '@utils/permissions'

export default function App() {

	useEffect(() => {
		getPermissions()
	}, [])

	return (
		<NativeBaseProvider theme={THEME}>
			<AuthContextProvider>
				<SocketProvider>
					<Routes />
				</SocketProvider>
			</AuthContextProvider>
		</NativeBaseProvider>
	)
}
