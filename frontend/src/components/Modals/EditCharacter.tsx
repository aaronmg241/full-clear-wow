import { useContext } from 'react'
import { Modal, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'
import ClassSpecForm from '../Forms/ClassSpecForm'
import { WebsocketContext } from '../Contexts/WebsocketContext'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'

type Props = {
	character: Character
	opened: boolean
	close: () => void
}

export default function EditCharacter({ character, opened, close }: Props) {
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const guildRoster = useGuildStore((state) => state.guildRoster)
	const { sendRosterUpdate } = useContext(WebsocketContext)
	const { currGuild } = useContext(CurrentGuildContext)
	const jwtAxios = useAxiosWithInterceptor()

	const form = useForm({
		initialValues: {
			name: character.name,
			characterClass: character.characterClass,
			spec: character.spec,
		},
		validate: {
			name: (value) => {
				if (value.length === 0) return 'Name is required.'
				if (value.length < 3) return 'Name must be at least 3 characters long.'
				if (value.length > 12) return 'Name must be 12 characters or less.'
				if (guildRoster.find((c) => c.name === value && c.id !== character.id))
					return 'A character in your roster already has this name.'
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

		// Optimistically update state
		addCharacterToRoster({ id: character.id, name, characterClass, spec, role })

		jwtAxios
			.put(`/guilds/${currGuild.id}/characters/${character.id}/`, { name, character_class: characterClass, spec, role })
			.then((response) => {
				sendRosterUpdate({
					...response.data,
					characterClass: response.data.character_class,
				})
			})
			.catch((error) => {
				console.log(error)
				// Revert optimistic update if there was an error. Character value will not be updated yet so we can just use what was passed in
				addCharacterToRoster({ ...character })
				notifications.show({
					title: 'Error',
					message: 'There was an error editing the character.',
					color: 'red',
					autoClose: 5000,
				})
			})
	}

	return (
		<>
			<Modal opened={opened} onClose={close} style={{ overflow: 'auto' }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Name' {...form.getInputProps('name')} data-autofocus maxLength={12}></TextInput>
					<ClassSpecForm form={form} initialClass={character.characterClass} />
					<Button type='submit' mt='1rem' style={{ display: 'block', marginLeft: 'auto' }}>
						Edit
					</Button>
				</form>
			</Modal>
		</>
	)
}
