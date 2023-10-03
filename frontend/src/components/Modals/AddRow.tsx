import { Modal, Button, TextInput, Flex, NumberInput, Collapse, Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useContext } from 'react'
import { RowsContext } from '../Contexts/RowsContext'
import { ButtonLink } from '../Buttons/ButtonLink'
import { useToggle } from '@mantine/hooks'

type Props = {
	opened: boolean
	close: () => void
}

const eventTypes: { value: string; label: string }[] = [
	{
		value: 'SCC',
		label: 'Spell Cast Success',
	},
	{
		value: 'SCS',
		label: 'Spell Cast Start',
	},
	{
		value: 'SAA',
		label: 'Spell Aura Applied',
	},
	{
		value: 'SAR',
		label: 'Spell Aura Removed',
	},
]

export default function AddRow({ opened, close }: Props) {
	const [useAdvancedOptions, toggleAdvancedOptions] = useToggle([false, true])
	const jwtAxios = useAxiosWithInterceptor()
	const { addRow } = useContext(RowsContext)
	const form = useForm({
		initialValues: {
			customName: '',
			minutes: 0,
			seconds: 0,
			eventType: '',
			counter: 0,
			spellId: null,
		},
		validate: {},
	})

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					close()
					form.reset()
				}}
			>
				<form onSubmit={form.onSubmit(() => {})}>
					<TextInput label='Row Label' size='sm' {...form.getInputProps('customName')} data-autofocus maxLength={50} />
					<Flex mt='1rem' gap='1rem'>
						<NumberInput label='Minutes' type='number' size='sm' {...form.getInputProps('minutes')} w={60} min={0} max={15} />
						<NumberInput label='Seconds' type='number' size='sm' {...form.getInputProps('seconds')} w={70} min={0} max={59} />
					</Flex>
					<ButtonLink onClick={() => toggleAdvancedOptions()} style={{ marginTop: '2rem' }}>
						Advanced Options
					</ButtonLink>
					<Collapse in={useAdvancedOptions}>
						<TextInput label='Spell Id' mt='1rem' {...form.getInputProps('spellId')} />
						<Flex gap='1rem' mt='1rem'>
							<Select
								label='Event Type'
								placeholder='Select an event type'
								data={eventTypes}
								{...form.getInputProps('eventType')}
							/>
							<NumberInput label='Counter' min={0} max={10} {...form.getInputProps('counter')} />
						</Flex>
					</Collapse>
					<Button mt='1rem' ml='auto' display='block' type='submit'>
						Add Row
					</Button>
				</form>
			</Modal>
		</>
	)
}
