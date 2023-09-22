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
	guilds: Guild[]
	setGuilds: Function
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
	guilds: [],
	setGuilds: () => {},
})

export default function LoginContextProvider({ children }: { children: React.ReactNode }) {
	const [loggedIn, setLoggedIn] = useState(false)
	const [loadingAccount, setLoadingAccount] = useState(true)
	const [userDisplayName, setUserDisplayName] = useState<string>('')
	const [guilds, setGuilds] = useState<Guild[]>([])
	const setCurrGuild = useGuildStore((state) => state.setCurrGuild)

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

		// You can also check for token validity, perform API requests, etc.
	}, [])

	function logout() {
		axios.post('/dj-rest-auth/logout/', {}, { withCredentials: true }).catch((error) => {
			console.log(error)
		})

		setLoggedIn(false)
		setUserDisplayName('')
		setGuilds([])
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
				setUserDisplayName(response.data.display_name)
				if (response.data.guilds) {
					setGuilds(response.data.guilds)
					if (response.data.guilds.length > 0) {
						setCurrGuild(response.data.guilds[0])
					}
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
		guilds,
		setGuilds,
	}

	return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>
}
