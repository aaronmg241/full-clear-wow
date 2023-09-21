import { Button, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import AccountFormContainer from '../components/Containers/AccountFormContainer'
import { ButtonLink } from '../components/Button/ButtonLink'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import { notifications } from '@mantine/notifications'

type Props = {
	loggedIn?: boolean
}

interface ResetPasswordErrorData {
	email?: string[]
	non_field_errors?: string[]
	new_password1?: string[]
	new_password2?: string[]
	token?: string[]
}

function parseResetPasswordErrors(data: ResetPasswordErrorData): string {
	if (data.token) {
		return 'This link is no longer valid.'
	}

	if (data.non_field_errors) {
		return data.non_field_errors.join(' ')
	}

	if (data.new_password1) {
		return data.new_password1.join(' ')
	}

	if (data.new_password2) {
		return data.new_password2.join(' ')
	}

	return 'There was an error resetting your password.'
}

export default function ResetPassword({ loggedIn }: Props) {
	const { uid, token } = useParams<{ uid: string; token: string }>()
	const navigate = useNavigate()
	const form = useForm({
		initialValues: {
			password1: '',
			password2: '',
		},
		validate: {
			password1: (value) => {
				if (value.length === 0) return 'Password is required.'
				if (value.length < 8) return 'Password must be at least 8 characters long.'
			},
			password2: (value, values) => {
				if (value.length === 0) return 'Password confirmation is required.'
				if (value !== values.password1) return 'Passwords do not match'
			},
		},
	})

	if (loggedIn) {
		axios
			.post(`/dj-rest-auth/logout/`, {}, { withCredentials: true })
			.then(() => {
				notifications.show({
					title: 'Success',
					message: 'Reset password successfully. Redirecting to login page...',
					autoClose: 5000,
				})
				setTimeout(() => {
					navigate('/')
				}, 1500)
			})
			.catch((error) => {
				console.log(error)
				const message = parseResetPasswordErrors(error.response.data)
				notifications.show({
					title: 'Error',
					color: 'red',
					message,
					autoClose: 6000,
				})
			})
	}

	return (
		<AccountFormContainer>
			<ButtonLink
				onClick={() => navigate('/')}
				style={{ marginLeft: 'auto', marginRight: 0, display: 'block', paddingBottom: '1rem' }}
			>
				Back to login
			</ButtonLink>
			<form
				onSubmit={form.onSubmit((values) => {
					const { password1, password2 } = values

					axios
						.post(`/dj-rest-auth/password/reset/confirm/`, { new_password1: password1, new_password2: password2, uid, token })
						.then(() => {
							notifications.show({
								title: 'Success',
								message: 'Reset password successfully. Redirecting to login page...',
								autoClose: 5000,
							})
							setTimeout(() => {
								navigate('/')
							}, 1500)
						})
						.catch((error) => {
							console.log(error)
							const message = parseResetPasswordErrors(error.response.data)
							notifications.show({
								title: 'Error',
								color: 'red',
								message,
								autoClose: 6000,
							})
						})
				})}
			>
				<PasswordInput label='Password' placeholder='Your password' mt='md' size='md' {...form.getInputProps('password1')} />
				<PasswordInput
					label='Confirm Password'
					placeholder='Your password'
					mt='md'
					size='md'
					{...form.getInputProps('password2')}
				/>
				<Button w='100%' mt='20px' type='submit'>
					Change Password
				</Button>
			</form>
		</AccountFormContainer>
	)
}
