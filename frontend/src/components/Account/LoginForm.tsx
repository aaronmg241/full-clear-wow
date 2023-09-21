import { useContext } from 'react'
import { TextInput, PasswordInput, Button, Text, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { GoogleLogin } from '@react-oauth/google'

import axios from 'axios'
import { LoginContext } from './LoginContext'
import { ButtonLink } from '../Button/ButtonLink'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
	const { setLoggedIn, loadData } = useContext(LoginContext)
	const navigate = useNavigate()

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) => {
				if (value.length === 0) return 'Email is required.'
				if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email'
			},
			password: (value) => {
				if (value.length === 0) return 'Password is required.'
				if (value.length < 8) return 'Password must be at least 8 characters long.'
			},
		},
	})

	const handleSubmit = async (email: string, password: string) => {
		axios
			.post('dj-rest-auth/login/', { email, password }, { withCredentials: true })
			.then(() => {
				setLoggedIn(true)
				notifications.clean()
				loadData()
			})
			.catch((error) => {
				console.log(error)
				notifications.show({
					title: 'Error',
					color: 'red',
					message: 'Invalid email/password combination.',
					autoClose: 5000,
				})
			})
	}

	return (
		<>
			<form onSubmit={form.onSubmit((values) => handleSubmit(values.email, values.password))}>
				<TextInput label='Email address' placeholder='hello@gmail.com' size='md' {...form.getInputProps('email')} />
				<PasswordInput label='Password' placeholder='Your password' mt='md' size='md' {...form.getInputProps('password')} />
				<ButtonLink
					style={{ marginTop: '10px', marginLeft: 'auto', display: 'block' }}
					onClick={() => {
						navigate('reset-password')
					}}
				>
					Forgot password?
				</ButtonLink>
				<Button w='100%' type='submit' mt='15px'>
					Login
				</Button>
			</form>
			<Text mt='10px' fz='14px'>
				Don&apos;t have an account?{' '}
				<ButtonLink
					onClick={() => {
						navigate('register')
					}}
				>
					Register
				</ButtonLink>
			</Text>
			<Divider m='1rem 0 1.25rem' />
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					axios
						.post('dj-rest-auth/google/', { access_token: credentialResponse.credential }, { withCredentials: true })
						.then(() => {
							setLoggedIn(true)
							notifications.show({
								title: 'Success',
								message: 'Successfully logged in!',
								autoClose: 3000,
							})
						})
						.catch((error) => {
							console.log(error)
							notifications.show({
								title: 'Error',
								color: 'red',
								message: 'Unable to login with provided credentials.',
								autoClose: 5000,
							})
						})
				}}
				onError={() => {
					console.log('Login Failed')
				}}
			/>
		</>
	)
}
