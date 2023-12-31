import { TextInput, PasswordInput, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { ButtonLink } from '../Button/ButtonLink'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
interface RegisterErrorData {
	email?: string[]
	non_field_errors?: string[]
	password1?: string[]
	password2?: string[]
}

function parseRegisterErrors(data: RegisterErrorData): string {
	if (data.email) {
		return data.email.join(' ')
	}

	if (data.non_field_errors) {
		return data.non_field_errors.join(' ')
	}

	if (data.password1) {
		return data.password1.join(' ')
	}

	if (data.password2) {
		return data.password2.join(' ')
	}

	return 'There was an error registering the user.'
}

export default function RegisterForm() {
	const navigate = useNavigate()
	const form = useForm({
		initialValues: {
			email: '',
			password1: '',
			password2: '',
		},
		validate: {
			email: (value) => {
				if (value.length === 0) return 'Email is required.'
				if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email'
			},
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

	return (
		<>
			<ButtonLink
				onClick={() => navigate('/')}
				style={{ marginLeft: 'auto', marginRight: 0, display: 'block', paddingBottom: '1rem' }}
			>
				Back
			</ButtonLink>
			<form
				onSubmit={form.onSubmit((values) => {
					const { email, password1, password2 } = values

					notifications.show({
						id: 'registering-user',
						message: 'Registering user...',
						autoClose: false,
					})

					axios
						.post('/dj-rest-auth/registration/', { email, password1, password2 })
						.then(() => {
							navigate('/')
							notifications.update({
								id: 'registering-user',
								title: 'Success',
								message: 'Successfully registered!',
								autoClose: 10000,
							})
						})
						.catch((error) => {
							const message = parseRegisterErrors(error.response.data)
							notifications.update({
								id: 'registering-user',
								title: 'Error',
								color: 'red',
								message,
								autoClose: message.length > 80 ? 10000 : 5000,
							})
						})
				})}
			>
				<TextInput label='Email address' placeholder='hello@gmail.com' size='md' {...form.getInputProps('email')} />
				<PasswordInput label='Password' placeholder='Your password' mt='md' size='md' {...form.getInputProps('password1')} />
				<PasswordInput
					label='Confirm Password'
					placeholder='Your password'
					mt='md'
					size='md'
					{...form.getInputProps('password2')}
				/>
				<Button w='100%' mt='20px' type='submit'>
					Register
				</Button>
			</form>
		</>
	)
}
