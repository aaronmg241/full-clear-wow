import './App.css'
import { useContext } from 'react'
import { LoginContext } from './components/Account/LoginContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home'
import Login from './routes/Login'
import Roster from './routes/Roster'
import Cooldowns from './routes/Cooldowns'
import ResetPassword from './routes/ResetPassword'

const authRouter = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
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
		path: '/reset-password',
		element: <ResetPassword loggedIn />,
	},
])

const unauthRouter = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/reset-password/:uid/:token',
		element: <ResetPassword />,
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
