import { Modal, Button, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useGuildStore } from '../../hooks/useGuildStore'
import { useContext } from 'react'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'

type Props = {
	opened: boolean
	close: () => void
}

export default function AddGuild({ opened, close }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const setGuilds = useGuildStore((state) => state.setGuilds)
	const guilds = useGuildStore((state) => state.guilds)
	const { setCurrGuild } = useContext(CurrentGuildContext)
	const form = useForm({
		initialValues: {
			newGuildName: '',
		},
		validate: {
			newGuildName: (value) => {
				if (value.length === 0) return 'Guild name is required.'
				if (value.length < 2) return 'Guild name must be at least 2 characters long.'
				if (value.length > 24) return 'Guild name can not be longer than 24 characters.'
			},
		},
	})

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					close()
					form.setFieldValue('newGuildName', '')
				}}
			>
				<form
					onSubmit={form.onSubmit(() => {
						jwtAxios
							.post('guilds/', { name: form.values.newGuildName })
							.then((response) => {
								setGuilds([...guilds, response.data])
								setCurrGuild(response.data.id)
								notifications.show({
									title: 'Success',
									message: 'Guild created successfully.',
									color: 'green',
									autoClose: 3000,
								})
							})
							.catch(() => {
								notifications.show({
									title: 'Error',
									message: 'There was an error creating your guild.',
									color: 'red',
									autoClose: 5000,
								})
							})
						form.setFieldValue('newGuildName', '')
						close()
					})}
				>
					<TextInput label='Guild Name' size='md' {...form.getInputProps('newGuildName')} data-autofocus maxLength={24} />
					<Button mt='1rem' ml='auto' display='block' type='submit'>
						Create Guild
					</Button>
				</form>
			</Modal>
		</>
	)
}
