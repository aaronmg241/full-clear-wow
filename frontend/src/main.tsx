import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Notifications } from '@mantine/notifications'
import { GoogleOAuthProvider } from '@react-oauth/google'

import LoginContextProvider from './components/Account/LoginContext.tsx'
import axios from 'axios'
import GlobalStyles from './theme/GlobalStyles.tsx'

import '@fontsource-variable/inter'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<QueryClientProvider client={queryClient}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'dark',
						fontFamily: 'Inter Variable, sans-serif',
						components: {
							Button: {
								defaultProps: {
									color: 'indigo.9',
								},
							},
						},
					}}
				>
					<GlobalStyles />
					<Notifications position='bottom-center' />
					<LoginContextProvider>
						<App />
					</LoginContextProvider>
				</MantineProvider>
			</QueryClientProvider>
		</GoogleOAuthProvider>
	</React.StrictMode>
)
