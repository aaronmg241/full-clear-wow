import React from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/react'

interface LoginButtonProps {
	email: string
	password: string
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password }) => {
	return (
		<Button
			width='100%'
			onClick={async () => {
				axios
					.post('dj-rest-auth/login/', { email, password }, { withCredentials: true })
					.then((response) => {
						console.log(response)
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
