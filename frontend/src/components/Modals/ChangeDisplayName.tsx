import { Modal, Button, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'

import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'

type Props = {
	opened: boolean
	close: () => void
	userDisplayName: string
	setUserDisplayName: Function
}

export default function ChangeDisplayName({ opened, close, userDisplayName, setUserDisplayName }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const form = useForm({
		initialValues: {
			newDisplayName: userDisplayName,
		},
		validate: {
			newDisplayName: (value) => {
				if (value.length === 0) return 'Display name is required.'
				if (value.length < 5) return 'Name must be at least 5 characters long.'
				if (value.length > 20) return 'Display name must be less than 20 characters long.'
			},
		},
	})

	useEffect(() => {
		form.setFieldValue('newDisplayName', userDisplayName)
	}, [userDisplayName])

	return (
		<>
			<Modal opened={opened} onClose={close} withCloseButton={false}>
				<form
					onSubmit={form.onSubmit((values) => {
						const { newDisplayName } = values

						if (newDisplayName === userDisplayName) {
							close()
							return
						}

						setUserDisplayName(newDisplayName)
						close()
						jwtAxios.post('/guilds/user/', { display_name: newDisplayName }).catch((error) => {
							console.log(error)
							notifications.show({
								title: 'Error',
								message: 'There was an error changing your display name.',
								color: 'red',
								autoClose: 5000,
							})
						})
					})}
				>
					<TextInput label='New Display Name' size='md' {...form.getInputProps('newDisplayName')} />
					<Button mt='1rem' ml='auto' display='block' type='submit'>
						Change Display Name
					</Button>
				</form>
			</Modal>
		</>
	)
}
