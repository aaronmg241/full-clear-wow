import { useContext } from 'react'
import { Modal, TextInput, Button, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'
import { IconPlus } from '@tabler/icons-react'
import ClassSpecForm from '../Forms/ClassSpecForm'
import { WebsocketContext } from '../Contexts/WebsocketContext'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'

export default function CreateCharacter() {
	const [opened, { open, close }] = useDisclosure(false)
	const { sendRosterUpdate } = useContext(WebsocketContext)
	const { currGuild } = useContext(CurrentGuildContext)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const guildRoster = useGuildStore((state) => state.guildRoster)
	const jwtAxios = useAxiosWithInterceptor()

	const form = useForm({
		initialValues: {
			name: '',
			characterClass: 'death_knight',
			spec: 'blood',
		},
		validate: {
			name: (value) => {
				if (value.length === 0) return 'Name is required.'
				if (value.length < 3) return 'Name must be at least 3 characters long.'
				if (value.length > 12) return 'Name must be 12 characters or less.'
				if (guildRoster.find((c) => c.name === value)) return 'A character in your roster already has this name.'
			},
			characterClass: (value) => {
				if (value.length === 0) return 'Class is required.'
			},
			spec: (value) => {
				if (value.length === 0) return 'Spec is required.'
			},
		},
	})

	const handleSubmit = () => {
		const { name, characterClass, spec } = form.values

		close()

		if (!currGuild) return

		const role = classes[characterClass].specs[spec].role

		// Here we could optimistically update state similar to the edit and delete functions.
		// However, we would need to generate a random id for the character so that we could remove it.
		// We would have to remove the character from the roster if the request fails or if the request succeeds.
		// I think we can not optimistically update it for now.

		jwtAxios
			.post(`/guilds/${currGuild.id}/characters/`, { name, characterClass, spec, role })
			.then((response) => {
				addCharacterToRoster({ ...response.data })
				sendRosterUpdate({
					...response.data,
				})
			})
			.catch((error) => {
				console.log(error)
				notifications.show({
					title: 'Error',
					message: 'There was an error adding the character.',
					color: 'red',
					autoClose: 5000,
				})
			})
	}

	const handleClick = () => {
		form.setFieldValue('name', '')
		open()
	}

	return (
		<>
			<Button variant='subtle' onClick={handleClick} leftIcon={<IconPlus size={rem(20)} />} color='indigo.4'>
				Add Character
			</Button>
			<Modal opened={opened} onClose={close} style={{ overflow: 'auto' }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Name' {...form.getInputProps('name')} data-autofocus maxLength={12}></TextInput>
					<ClassSpecForm form={form} initialClass={form.values.characterClass} />
					<Button type='submit' mt='1rem' style={{ display: 'block', marginLeft: 'auto' }}>
						Create
					</Button>
				</form>
			</Modal>
		</>
	)
}
