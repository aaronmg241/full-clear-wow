import { Flex, Menu, Popover } from '@mantine/core'

import SpellCooldownDisplay from './SpellCooldownDisplay'
import CharacterDisplay from '../Roster/CharacterDisplay'
import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'
import { findRemainingCooldown } from '../../utils/cooldowns'

type Props = {
	character: Character
	rowIndex: number
	columnIndex: number
	closeMenu: () => void
	currHealer: string | null
	onClick: () => void
}

export default function HealerPopover({ character, rowIndex, columnIndex, closeMenu, currHealer, onClick }: Props) {
	const addCooldownToBossPlan = useGuildStore((state) => state.addCooldownToBossPlan)
	const currBossPlan = useGuildStore((state) => state.currBossPlan)
	const opened = currHealer === character.id

	if (!currBossPlan) return null

	const abilities = classes[character.characterClass].specs[character.spec].importantAbilities

	const abilitiesWithRemainingCooldown = abilities.map((ability) => {
		return {
			...ability,
			cooldownRemaining: findRemainingCooldown(currBossPlan, rowIndex, character, ability),
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
									addCooldownToBossPlan(rowIndex, columnIndex, character, ability)
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
