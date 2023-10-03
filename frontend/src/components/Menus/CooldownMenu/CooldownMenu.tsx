import { useState, useContext } from 'react'
import { Menu, Button, Text, TextInput, rem } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import { findCooldown } from '../../../utils/cooldowns'
import CooldownSearch from './CooldownSearch'
import AssignedAbilityDisplay from '../../CooldownTable/AssignedAbilityDisplay'
import HealerMenuList from './HealerMenuList'
import { RowsContext } from '../../Contexts/RowsContext'
import CustomTextPopover from './CustomTextPopover'
import CustomInstructionDisplay from '../../CooldownTable/CustomInstructionDisplay'

type Props = {
	row: BossPlanRow
	rowIndex: number
	columnIndex: number
}

export default function CooldownMenu({ row, rowIndex, columnIndex }: Props) {
	const [isSearching, setIsSearching] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [menuOpened, setMenuOpened] = useState(false)
	const [currMenuOption, setCurrMenuOption] = useState<null | string>(null)

	const { removeCooldownFromRow } = useContext(RowsContext)

	const assignedAbility = findCooldown(row, columnIndex)

	return (
		<Menu
			shadow='md'
			onClose={() => {
				setIsSearching(false)
				setSearchValue('')
				setCurrMenuOption(null)
			}}
			opened={menuOpened}
			onChange={setMenuOpened}
			transitionProps={{ duration: 0 }}
		>
			<Menu.Target>
				<Button
					w='100%'
					h='100%'
					bg={menuOpened ? 'var(--hover-indigo-bg)' : 'transparent'}
					p={0}
					fw={500}
					style={{ borderRadius: 0 }}
					styles={(theme) => ({
						root: {
							'&:not([data-disabled])': theme.fn.hover({
								background: 'var(--hover-indigo-bg)',
							}),
						},
						inner: {
							height: 'auto',
						},
					})}
				>
					{assignedAbility &&
						(assignedAbility.spellId ? (
							<AssignedAbilityDisplay assignedCooldown={assignedAbility} />
						) : (
							<CustomInstructionDisplay assignedCooldown={assignedAbility} />
						))}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				{assignedAbility && (
					<>
						<Menu.Item
							color='var(--danger-red)'
							icon={<IconX size={rem(20)} />}
							onClick={() => {
								removeCooldownFromRow(rowIndex, columnIndex)
							}}
						>
							Remove Cooldown
						</Menu.Item>
					</>
				)}
				<Menu.Label>Search</Menu.Label>
				<TextInput
					ml='0.75rem'
					mb='1rem'
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value)
					}}
					onFocus={() => {
						setIsSearching(true)
					}}
				/>

				{isSearching && <CooldownSearch searchValue={searchValue} rowIndex={rowIndex} columnIndex={columnIndex} />}

				{!isSearching && (
					<>
						<HealerMenuList
							rowIndex={rowIndex}
							columnIndex={columnIndex}
							closeMenu={() => setMenuOpened(false)}
							currMenuOption={currMenuOption}
							setCurrMenuOption={setCurrMenuOption}
						/>
						<Menu.Label>Custom Instruction</Menu.Label>
						<CustomTextPopover
							rowIndex={rowIndex}
							columnIndex={columnIndex}
							closeMenu={() => setMenuOpened(false)}
							onClick={() => {
								setCurrMenuOption('customText')
							}}
							currMenuOption={currMenuOption}
						/>
					</>
				)}
			</Menu.Dropdown>
		</Menu>
	)
}
