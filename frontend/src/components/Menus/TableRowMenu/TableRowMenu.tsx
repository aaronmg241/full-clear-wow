import { Menu, rem, Tooltip } from '@mantine/core'
import TableActionButton from '../../Buttons/TableActionButton'
import { useToggle } from '@mantine/hooks'
import { IconArrowElbowRight, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useContext } from 'react'
import { RowsContext } from '../../Contexts/RowsContext'
import AddRow from '../../Modals/AddRow'

type Props = {
	row: BossPlanRow
	rowIndex: number
}

export default function TableRowMenu({ row, rowIndex }: Props) {
	const [menuOpened, toggleMenu] = useToggle([false, true])
	const [addRowOpened, toggleAddRow] = useToggle([false, true])
	const { addNewLine } = useContext(RowsContext)
	return (
		<>
			<Menu transitionProps={{ duration: 0 }} opened={menuOpened} onChange={toggleMenu}>
				<Menu.Target>
					<TableActionButton selected={false} fontWeight='normal'>
						{row.spellName}
					</TableActionButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>New Row</Menu.Label>
					<Menu.Item icon={<IconPlus size={rem(20)} />} onClick={() => toggleAddRow()}>
						Add Row Above
					</Menu.Item>
					<Menu.Item icon={<IconPlus size={rem(20)} />} onClick={() => toggleAddRow()}>
						Add Row Below
					</Menu.Item>

					<Menu.Label>This Row</Menu.Label>
					<Menu.Item icon={<IconEdit size={rem(20)} />}>Edit Row</Menu.Item>
					<Tooltip
						position='right'
						label='Adds another line under this row to allow for more cooldowns.'
						multiline
						w={200}
						openDelay={500}
					>
						<Menu.Item
							icon={<IconArrowElbowRight size={rem(20)} />}
							disabled={row.rowsRequired > 1}
							onClick={() => addNewLine(rowIndex)}
						>
							Add New Line
						</Menu.Item>
					</Tooltip>
					<Menu.Item icon={<IconTrash size={rem(20)} />} color='var(--danger-red)'>
						Delete Row
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
			<AddRow opened={addRowOpened} close={toggleAddRow} />
		</>
	)
}
