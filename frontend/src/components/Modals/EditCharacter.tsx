import { Modal, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

import { classes } from '../../types/Classes'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { notifications } from '@mantine/notifications'
import { useGuildStore } from '../../hooks/useGuildStore'
import ClassSpecForm from '../Forms/ClassSpecForm'

type Props = {
	character: Character
	opened: boolean
	close: () => void
}

export default function EditCharacter({ character, opened, close }: Props) {
	const currGuild = useGuildStore((state) => state.currGuild)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
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

		jwtAxios
			.put(`/guilds/${currGuild.id}/characters/${character.id}/`, { name, character_class: characterClass, spec, role })
			.then((response) => {
				addCharacterToRoster({ ...response.data, characterClass: response.data.character_class })
			})
			.catch((error) => {
				console.log(error)
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
