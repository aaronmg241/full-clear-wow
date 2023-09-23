import { Modal, Button, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useGuildStore } from '../../hooks/useGuildStore'

type Props = {
	opened: boolean
	close: () => void
}

export default function AddGuild({ opened, close }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const setGuilds = useGuildStore((state) => state.setGuilds)
	const guilds = useGuildStore((state) => state.guilds)
	const setCurrGuild = useGuildStore((state) => state.setCurrGuild)
	const form = useForm({
		initialValues: {
			newGuildName: '',
		},
		validate: {
			newGuildName: (value) => {
				if (value.length === 0) return 'Display name is required.'
				if (value.length < 2) return 'Name must be at least 2 characters long.'
				if (value.length > 20) return 'Display name must be less than 20 characters long.'
			},
		},
	})

	return (
		<>
			<Modal opened={opened} onClose={close}>
				<form
					onSubmit={form.onSubmit(() => {
						close()
						jwtAxios
							.post('guilds/', { name: form.values.newGuildName })
							.then((response) => {
								setGuilds([...guilds, response.data])
								setCurrGuild(response.data)
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
					})}
				>
					<TextInput label='Guild Name' size='md' {...form.getInputProps('newGuildName')} />
					<Button mt='1rem' ml='auto' display='block' type='submit'>
						Create Guild
					</Button>
				</form>
			</Modal>
		</>
	)
}
