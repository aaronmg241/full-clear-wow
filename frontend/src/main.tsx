import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import { GoogleOAuthProvider } from '@react-oauth/google'
import theme from './theme/theme.ts'

import LoginContextProvider from './components/LoginContext.tsx'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<ChakraProvider theme={theme}>
				<LoginContextProvider>
					<App />
				</LoginContextProvider>
			</ChakraProvider>
		</GoogleOAuthProvider>
	</React.StrictMode>
)
