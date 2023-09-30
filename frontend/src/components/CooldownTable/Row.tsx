import { useState } from 'react'
import { Menu, Button, Text, TextInput, rem } from '@mantine/core'

import { secondsToMMSS } from '../../utils/cooldowns'
import CooldownSearch from './CooldownSearch'
import AssignedAbilityDisplay from './AssignedAbilityDisplay'
import { IconX } from '@tabler/icons-react'
import { useGuildStore } from '../../hooks/useGuildStore'
import HealerMenuList from './HealerMenuList'

type Props = {
	row: BossPlanRow
	rowIndex: number
}

function findCooldown(row: BossPlanRow, column: number) {
	for (const ability of row.assignedCooldowns) {
		if (column === ability.column) {
			return ability
		}
	}

	return null
}

export default function Row({ row, rowIndex }: Props) {
	return (
		<tr>
			<td>{row.spellName}</td>
			<td>{secondsToMMSS(row.time)}</td>
			{Array.from({ length: 6 }).map((_, columnIndex) => {
				return (
					<td key={columnIndex} width='120px'>
						<CooldownMenu row={row} rowIndex={rowIndex} columnIndex={columnIndex} />
					</td>
				)
			})}
		</tr>
	)
}

function CooldownMenu({ row, rowIndex, columnIndex }: Props & { columnIndex: number }) {
	const [isSearching, setIsSearching] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [menuOpened, setMenuOpened] = useState(false)

	const removeCooldownFromBossPlan = useGuildStore((state) => state.removeCooldownFromBossPlan)

	const assignedAbility = findCooldown(row, columnIndex)

	return (
		<Menu
			shadow='md'
			onClose={() => {
				setIsSearching(false)
				setSearchValue('')
			}}
			opened={menuOpened}
			onChange={setMenuOpened}
			transitionProps={{ duration: 0 }}
		>
			<Menu.Target>
				<Button
					w='100%'
					h='100%'
					bg='transparent'
					p={0}
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
					{assignedAbility && (
						<Text size='sm' weight={500}>
							<AssignedAbilityDisplay character={assignedAbility.character} ability={assignedAbility.ability} />
						</Text>
					)}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				{assignedAbility && (
					<>
						<Menu.Item
							color='var(--danger-red)'
							icon={<IconX size={rem(20)} />}
							onClick={() => {
								removeCooldownFromBossPlan(rowIndex, columnIndex)
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

				{!isSearching && <HealerMenuList rowIndex={rowIndex} columnIndex={columnIndex} closeMenu={() => setMenuOpened(false)} />}
			</Menu.Dropdown>
		</Menu>
	)
}
