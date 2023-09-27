import './App.css'
import { useContext } from 'react'
import { LoginContext } from './components/Account/LoginContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Auth/Home'
import Login from './routes/Login'
import Roster from './routes/Auth/Roster'
import Cooldowns from './routes/Auth/Cooldowns'
import ResetPassword from './components/Account/ResetPasswordConfirmForm'
import LoginForm from './components/Account/LoginForm'
import RegisterForm from './components/Account/RegisterForm'
import ResetPasswordForm from './components/Account/ResetPasswordForm'
import GuildInvite from './routes/GuildInvite'
import WebsocketContextProvider from './components/Contexts/WebsocketContext'
import CurrentGuildContextProvider from './components/Contexts/CurrentGuildContext'
import LostPage from './routes/404'

const authRouter = createBrowserRouter([
	{
		path: '/:guildId?',
		element: (
			<CurrentGuildContextProvider>
				<WebsocketContextProvider>
					<Home />
				</WebsocketContextProvider>
			</CurrentGuildContextProvider>
		),
		children: [
			{
				path: '',
				element: <Roster />,
			},
			{
				path: 'cooldowns',
				element: <Cooldowns />,
			},
		],
	},
	{
		path: '/reset-password/:uid/:token',
		element: <ResetPassword loggedIn />,
	},
	{
		path: '/guilds/invite/:code',
		element: <GuildInvite />,
	},
	{
		path: '*',
		element: <LostPage />,
	},
])

const unauthRouter = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		children: [
			{
				path: '',
				element: <LoginForm />,
			},
			{
				path: '/register',
				element: <RegisterForm />,
			},
			{
				path: '/reset-password',
				element: <ResetPasswordForm />,
			},
			{
				path: '/reset-password/:uid/:token',
				element: <ResetPassword />,
			},
			{
				path: '*',
				element: <LoginForm />,
			},
		],
	},
])

function App() {
	const { loggedIn, loadingAccount } = useContext(LoginContext)

	if (loadingAccount) {
		return <div />
	}

	if (!loggedIn) {
		return <RouterProvider router={unauthRouter} />
	}

	return <RouterProvider router={authRouter} />
}

export default App
