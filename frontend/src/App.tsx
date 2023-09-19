import './App.css'
import { useContext } from 'react'
import { LoginContext } from './components/Account/LoginContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home'
import Login from './routes/Login'
import Roster from './routes/Roster'
import Cooldowns from './routes/Cooldowns'

const router = createBrowserRouter([
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
])

function App() {
	const { loggedIn, loadingAccount } = useContext(LoginContext)

	if (loadingAccount) {
		return <div />
	}

	if (!loggedIn) {
		return <Login />
	}

	return <RouterProvider router={router} />
}

export default App
