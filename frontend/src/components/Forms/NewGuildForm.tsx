import { useContext } from 'react'
import { Button, Flex, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { LoginContext } from '../Account/LoginContext'
import { notifications } from '@mantine/notifications'

type Props = {}

export default function NewGuildForm({}: Props) {
	const { setGuilds } = useContext(LoginContext)
	const jwtAxios = useAxiosWithInterceptor()
	const newGuildForm = useForm({
		initialValues: {
			guildName: '',
		},
		validate: {
			guildName: (value) => {
				if (value.length === 0) return 'Guild name is required.'
				if (value.length < 3) return 'Guild name must be at least 3 characters long.'
			},
		},
	})

	const handleSubmit = () => {
		jwtAxios
			.post('guilds/', { name: newGuildForm.values.guildName })
			.then((response) => {
				console.log(response.data)
				setGuilds([response.data])
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
	}

	return (
		<Flex direction='column' pl='2rem'>
			<form aria-describedby='guild-form-label' onSubmit={newGuildForm.onSubmit(handleSubmit)}>
				<Text id='guild-form-label' maw='70ch' mb='1rem'>
					It looks like this is your first time logging in. Create a guild below to manage rosters and assign cooldowns.
				</Text>
				<TextInput label='Guild Name' {...newGuildForm.getInputProps('guildName')} w='300px' />
				<Button type='submit' mt='1rem'>
					Create Guild
				</Button>
			</form>
		</Flex>
	)
}
