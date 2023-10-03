import { useContext } from 'react'
import { Flex, Menu, Popover } from '@mantine/core'

import SpellCooldownDisplay from '../../CooldownTable/SpellCooldownDisplay'
import CharacterDisplay from '../../Roster/CharacterDisplay'
import { classes } from '../../../types/data/Classes'
import { findRemainingCooldown } from '../../../utils/cooldowns'
import { RowsContext } from '../../Contexts/RowsContext'

type Props = {
	character: Character
	rowIndex: number
	columnIndex: number
	closeMenu: () => void
	currHealer: string | null
	onClick: () => void
}

export default function HealerPopover({ character, rowIndex, columnIndex, closeMenu, currHealer, onClick }: Props) {
	const { rows, addCooldownToRow } = useContext(RowsContext)
	const opened = currHealer === character.id

	const abilities = classes[character.characterClass].specs[character.spec].importantAbilities

	const abilitiesWithRemainingCooldown = abilities.map((ability) => {
		return {
			...ability,
			cooldownRemaining: findRemainingCooldown(rows, rowIndex, character, ability),
		}
	})

	abilitiesWithRemainingCooldown.sort((a, b) => a.cooldownRemaining - b.cooldownRemaining)

	return (
		<Popover position='right' offset={15} withinPortal={false} opened={opened}>
			<Popover.Target>
				<Menu.Item
					pt='0.25rem'
					pb='0.25rem'
					closeMenuOnClick={false}
					onMouseEnter={onClick}
					bg={opened ? 'var(--hover-bg)' : 'transparent'}
					onClick={onClick}
				>
					<CharacterDisplay character={character} />
				</Menu.Item>
			</Popover.Target>
			<Popover.Dropdown p='0.5rem 0'>
				<Flex direction='column' gap='0.5rem'>
					{abilitiesWithRemainingCooldown.map((ability) => {
						return (
							<SpellCooldownDisplay
								key={ability.spellName}
								spellName={ability.spellName}
								readableName={ability.readableName}
								cooldownRemaining={ability.cooldownRemaining}
								onClick={() => {
									addCooldownToRow(rowIndex, columnIndex, character.id, ability.spellID)
									closeMenu()
								}}
							/>
						)
					})}
				</Flex>
			</Popover.Dropdown>
		</Popover>
	)
}
