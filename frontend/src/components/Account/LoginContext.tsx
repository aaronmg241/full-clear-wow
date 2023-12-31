import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import { useGuildStore } from '../../hooks/useGuildStore'

// Define the types for the context
interface LoginContextType {
	loggedIn: boolean
	loadingAccount: boolean
	setLoggedIn: Function
	loadData: Function
	logout: Function
	userDisplayName: string
	setUserDisplayName: Function
}

// Create an LoginContext
export const LoginContext = createContext<LoginContextType>({
	loggedIn: false,
	loadingAccount: true,
	setLoggedIn: () => {},
	loadData: () => {},
	logout: () => {},
	userDisplayName: '',
	setUserDisplayName: () => {},
})

export default function LoginContextProvider({ children }: { children: React.ReactNode }) {
	const [loggedIn, setLoggedIn] = useState(false)
	const [loadingAccount, setLoadingAccount] = useState(true)
	const [userDisplayName, setUserDisplayName] = useState<string>('')
	const setGuilds = useGuildStore((state) => state.setGuilds)
	const clearStore = useGuildStore((state) => state.clearStore)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axios.post('/dj-rest-auth/token/refresh/', {}, { withCredentials: true })
				setLoggedIn(true)
				loadData()
			} catch {
				setLoggedIn(false)
				setLoadingAccount(false)
			}
		}

		checkAuth().catch((error) => {
			console.log(error)
		})
	}, [])

	function logout() {
		axios.post('/dj-rest-auth/logout/', {}, { withCredentials: true }).catch((error) => {
			console.log(error)
		})

		clearStore()
		setLoggedIn(false)
		setUserDisplayName('')
	}

	function loadData() {
		setLoadingAccount(true)
		notifications.show({
			id: 'loading-account',
			title: 'Loading',
			message: 'Loading your account info...',
			autoClose: false,
		})

		axios
			.get('/guilds/user/', { withCredentials: true })
			.then((response) => {
				setUserDisplayName(response.data.displayName)
				if (response.data.guilds) {
					setGuilds(response.data.guilds)
				}
				notifications.hide('loading-account')
			})
			.catch((error) => {
				console.log(error)
				notifications.update({
					id: 'loading-account',
					title: 'Error',
					message: 'There was an error getting your user info.',
					color: 'red',
					autoClose: 3000,
				})
			})
			.finally(() => {
				setLoadingAccount(false)
			})
	}

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: LoginContextType = {
		loggedIn,
		loadingAccount,
		setLoggedIn,
		loadData,
		logout,
		userDisplayName,
		setUserDisplayName,
	}

	return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>
}
