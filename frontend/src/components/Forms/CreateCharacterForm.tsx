import { forwardRef, useState, useContext } from 'react'
import { Modal, TextInput, Flex, Select, Button, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

import { classes } from '../../types/Classes'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { LoginContext } from '../Account/LoginContext'
import { notifications } from '@mantine/notifications'
import { useGuildStore } from '../../hooks/useGuildStore'

type Props = {}

const classData = Object.keys(classes).map((key) => {
	return { value: key, label: classes[key].readableName, color: classes[key].color }
})

export default function CreateCharacterForm({}: Props) {
	const [opened, { open, close }] = useDisclosure(false)
	const { addCharacterToRoster } = useGuildStore()
	const { currGuild } = useContext(LoginContext)
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

	const [specOptions, setSpecOptions] = useState(
		Object.keys(classes['death_knight'].specs).map((key) => ({
			value: key,
			label: classes['death_knight'].specs[key].readableName,
		})) as { value: string; label: string }[]
	)

	const handleSubmit = () => {
		const { name, characterClass, spec } = form.values

		close()

		if (!currGuild) return

		const role = classes[characterClass].specs[spec].role

		jwtAxios
			.post(`/guilds/${currGuild.id}/characters/`, { name, character_class: characterClass, spec, role })
			.then((response) => {
				console.log(response)
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
			<Button variant='outline' onClick={open} color='indigo.4'>
				Add Character
			</Button>
			<Modal opened={opened} onClose={close} withCloseButton={false} style={{ overflow: 'auto' }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label='Name' {...form.getInputProps('name')}></TextInput>
					<Flex gap='1rem' mt='1rem'>
						<Select
							withinPortal
							label='Class'
							searchable
							data={classData}
							itemComponent={SelectItem}
							{...form.getInputProps('characterClass')}
							onChange={(selectedClass: string) => {
								const options = Object.keys(classes[selectedClass].specs).map((key) => ({
									value: key,
									label: classes[selectedClass].specs[key].readableName,
								}))
								setSpecOptions(options)
								form.setFieldValue('characterClass', selectedClass)
								form.setFieldValue('spec', options[0].value)
							}}
							styles={() => ({
								input: {
									// applies styles to selected item
									color: classes[form.values.characterClass].color,
								},
							})}
						/>
						<Select label='Spec' searchable withinPortal data={specOptions} {...form.getInputProps('spec')} />
					</Flex>
					<Button type='submit' mt='1rem' style={{ display: 'block', marginLeft: 'auto' }}>
						Create
					</Button>
				</form>
			</Modal>
		</>
	)
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
	color: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, color, ...others }: ItemProps, ref) => (
	<div ref={ref} {...others}>
		<Text size='sm' color={color}>
			{label}
		</Text>
	</div>
))
