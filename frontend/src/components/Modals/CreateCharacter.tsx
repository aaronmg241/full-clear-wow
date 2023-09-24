import { Modal, TextInput, Button, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import { classes } from '../../types/Classes'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { notifications } from '@mantine/notifications'
import { useGuildStore } from '../../hooks/useGuildStore'
import { IconPlus } from '@tabler/icons-react'
import ClassSpecForm from '../Forms/ClassSpecForm'

type Props = {}

export default function CreateCharacter({}: Props) {
	const [opened, { open, close }] = useDisclosure(false)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const currGuild = useGuildStore((state) => state.currGuild)
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
			.post(`/guilds/${currGuild.id}/characters/`, { name, character_class: characterClass, spec, role })
			.then((response) => {
				addCharacterToRoster(response.data)
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

	return (
		<>
			<Button
				variant='outline'
				onClick={() => {
					form.setFieldValue('name', '')
					open()
				}}
				color='indigo.4'
				leftIcon={<IconPlus size={rem(20)} />}
			>
				Add Character
			</Button>
			<Modal opened={opened} onClose={close} style={{ overflow: 'auto' }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Name' {...form.getInputProps('name')} data-autofocus maxLength={12}></TextInput>
					<ClassSpecForm form={form} />
					<Button type='submit' mt='1rem' style={{ display: 'block', marginLeft: 'auto' }}>
						Create
					</Button>
				</form>
			</Modal>
		</>
	)
}