import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Define the types for the context
interface LoginContextType {
	loggedIn: boolean
	loadingAccount: boolean
	setLoggedIn: Function
}

// Create an LoginContext
export const LoginContext = createContext<LoginContextType>({
	loggedIn: false,
	loadingAccount: true,
	setLoggedIn: () => {},
})

export default function LoginContextProvider({ children }: { children: React.ReactNode }) {
	const [loggedIn, setLoggedIn] = useState(false)
	const [loadingAccount, setLoadingAccount] = useState(true)

	useEffect(() => {
		axios
			.post('/dj-rest-auth/token/refresh/', {}, { withCredentials: true })
			.then(() => {
				setLoggedIn(true)
			})
			.catch(() => {
				setLoggedIn(false)
			})
			.finally(() => {
				setLoadingAccount(false)
			})

		// You can also check for token validity, perform API requests, etc.
	}, [])

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: LoginContextType = { loggedIn, loadingAccount, setLoggedIn }

	return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>
}
