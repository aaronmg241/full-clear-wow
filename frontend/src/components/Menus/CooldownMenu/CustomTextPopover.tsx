import { forwardRef, useContext } from 'react'
import { Popover, Menu, rem, Flex, TextInput, Select, Text, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useGuildStore } from '../../../hooks/useGuildStore'
import { classes } from '../../../types/data/Classes'
import { useForm } from '@mantine/form'
import { RowsContext } from '../../Contexts/RowsContext'

type Props = {
	rowIndex: number
	columnIndex: number
	closeMenu: () => void
	onClick: () => void
	currMenuOption: string | null
}

export default function CustomTextPopover({ rowIndex, columnIndex, closeMenu, onClick, currMenuOption }: Props) {
	const opened = currMenuOption === 'customText'
	const bossRoster = useGuildStore((store) => store.bossRoster)
	const { addCooldownToRow } = useContext(RowsContext)

	const data = bossRoster
		.map((character) => {
			return {
				value: character.id,
				label: character.name,
				characterClass: character.characterClass,
			}
		})
		.sort((a, b) => a.label.localeCompare(b.label))

	const form = useForm({
		initialValues: {
			instruction: '',
			character: 'everyone',
		},
		validate: {
			instruction: (value) => {
				if (value.length === 0) return 'Instruction is required.'
			},
		},
	})

	const handleSubmit = () => {
		addCooldownToRow(rowIndex, columnIndex, form.values.character, null, form.values.instruction)
		closeMenu()
	}

	return (
		<Popover position='right-end' offset={15} withinPortal={false} opened={opened}>
			<Popover.Target>
				<Menu.Item closeMenuOnClick={false} onMouseEnter={onClick} onClick={onClick} icon={<IconPlus size={rem(20)} />}>
					Add Custom Instruction
				</Menu.Item>
			</Popover.Target>
			<Popover.Dropdown p='1rem'>
				<Flex direction='column' gap='0.5rem'>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput label='Text' {...form.getInputProps('instruction')} />
						<Select
							data={[{ value: 'everyone', label: 'Everyone' }, ...data]}
							label='Character'
							searchable
							itemComponent={SelectItem}
							{...form.getInputProps('character')}
						/>
						<Button mt='1rem' type='submit'>
							Add Custom
						</Button>
					</form>
				</Flex>
			</Popover.Dropdown>
		</Popover>
	)
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
	characterClass?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, characterClass, ...others }: ItemProps, ref) => {
	const textColor = characterClass ? classes[characterClass].color : 'var(--text-primary)'

	return (
		<div ref={ref} {...others}>
			<Text size='sm' color={textColor}>
				{label}
			</Text>
		</div>
	)
})
