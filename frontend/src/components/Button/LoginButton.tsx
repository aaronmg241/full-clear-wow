import React from 'react'
import axios from 'axios'
import { Button } from '@mantine/core'

interface LoginButtonProps {
	email: string
	password: string
	setLoggedIn: Function
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password, setLoggedIn }) => {
	return (
		<Button
			w='100%'
			onClick={async () => {
				axios
					.post('dj-rest-auth/login/', { email, password }, { withCredentials: true })
					.then(() => {
						setLoggedIn(true)
					})
					.catch((error) => {
						console.log(error)
					})
			}}
		>
			Login
		</Button>
	)
}

export default LoginButton
