import { useEffect } from 'react'

import 'react-native-gesture-handler'
import 'react-native-reanimated'

import './global.css'


import { Routes } from './src/routes'

import { SocketProvider } from '@contexts/socket'
import { AuthContextProvider } from '@contexts/AuthContext'

import { getPermissions } from '@utils/permissions'
import { ToastProvider } from '@components/Toast'

export default function App() {

	useEffect(() => {
		getPermissions()
	}, [])

	return (
		<AuthContextProvider>
			<SocketProvider>
				<ToastProvider>
					<Routes />
				</ToastProvider>
			</SocketProvider>
		</AuthContextProvider>
	)
}
