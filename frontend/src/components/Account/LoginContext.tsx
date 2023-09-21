import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { notifications } from '@mantine/notifications'

// Define the types for the context
interface LoginContextType {
	loggedIn: boolean
	loadingAccount: boolean
	setLoggedIn: Function
	userDisplayName: string
	setUserDisplayName: Function
}

// Create an LoginContext
export const LoginContext = createContext<LoginContextType>({
	loggedIn: false,
	loadingAccount: true,
	setLoggedIn: () => {},
	userDisplayName: '',
	setUserDisplayName: () => {},
})

export default function LoginContextProvider({ children }: { children: React.ReactNode }) {
	const [loggedIn, setLoggedIn] = useState(false)
	const [loadingAccount, setLoadingAccount] = useState(true)
	const [userDisplayName, setUserDisplayName] = useState<string>('')

	useEffect(() => {
		const checkAuth = async () => {
			const result = await axios.post('/dj-rest-auth/token/refresh/', {}, { withCredentials: true })

			if (result.status === 200) {
				setLoggedIn(true)
				setLoadingAccount(false)
			} else {
				setLoggedIn(false)
				setLoadingAccount(false)
				return
			}

			axios
				.get('/guilds/user/', { withCredentials: true })
				.then((response) => {
					setUserDisplayName(response.data)
				})
				.catch((error) => {
					console.log(error)
					notifications.show({
						title: 'Error',
						message: 'There was an error getting your user info.',
						color: 'red',
						autoClose: 5000,
					})
				})
		}

		checkAuth().catch((error) => {
			console.log(error)
		})

		// You can also check for token validity, perform API requests, etc.
	}, [])

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: LoginContextType = { loggedIn, loadingAccount, setLoggedIn, userDisplayName, setUserDisplayName }

	return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>
}
