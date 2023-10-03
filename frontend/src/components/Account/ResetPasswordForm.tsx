import { useForm } from '@mantine/form'
import { TextInput, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { ButtonLink } from '../Buttons/ButtonLink'

import { IconCheck, IconExclamationCircle } from '@tabler/icons-react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswordForm() {
	const navigate = useNavigate()
	const form = useForm({
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) => {
				if (value.length === 0) return 'Email is required.'
				if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email'
			},
		},
	})

	return (
		<>
			<ButtonLink onClick={() => navigate('/')} style={{ marginBottom: 20, display: 'block', marginLeft: 'auto' }}>
				Back
			</ButtonLink>
			<form
				onSubmit={form.onSubmit((values) => {
					const { email } = values

					notifications.show({
						id: 'reset-password-notification',
						loading: true,
						message: 'Sending email..',
						autoClose: false,
						withCloseButton: false,
					})

					axios
						.post('/dj-rest-auth/password/reset/', { email })
						.then(() => {
							notifications.update({
								id: 'reset-password-notification',
								title: 'Success',
								message: 'We sent an email with instructions to reset your account.',
								autoClose: 5000,
								icon: <IconCheck size='1rem' />,
								withCloseButton: false,
							})
						})
						.catch((err) => {
							console.log(err)
							notifications.update({
								id: 'reset-password-notification',
								title: 'Error',
								color: 'red',
								message: 'There was an error sending the email.',
								autoClose: 5000,
								icon: <IconExclamationCircle size='1rem' />,
								withCloseButton: false,
							})
						})
				})}
			>
				<TextInput label='Email address' placeholder='hello@gmail.com' size='md' {...form.getInputProps('email')} />
				<Button w='100%' mt='20px' type='submit'>
					Send Reset Email
				</Button>
			</form>
		</>
	)
}
