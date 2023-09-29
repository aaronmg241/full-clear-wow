import { Flex, HoverCard, UnstyledButton, Menu } from '@mantine/core'

import SpellCooldownDisplay from './SpellCooldownDisplay'
import CharacterDisplay from '../Roster/CharacterDisplay'
import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'
import { findRemainingCooldown } from '../../utils/cooldowns'

type Props = {
	character: Character
	rowIndex: number
	columnIndex: number
}

export default function HealerHoverCard({ character, rowIndex, columnIndex }: Props) {
	const addCooldownToBossPlan = useGuildStore((state) => state.addCooldownToBossPlan)
	const currBossPlan = useGuildStore((state) => state.currBossPlan)

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
		<Menu.Item pt='0.25rem' pb='0.25rem' closeMenuOnClick={false}>
			<HoverCard position='right' offset={25} closeDelay={50} openDelay={100} withinPortal={false}>
				<HoverCard.Target>
					<UnstyledButton w='100%'>
						<CharacterDisplay character={character} />
					</UnstyledButton>
				</HoverCard.Target>
				<HoverCard.Dropdown p='0.5rem 0'>
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
									}}
								/>
							)
						})}
					</Flex>
				</HoverCard.Dropdown>
			</HoverCard>
		</Menu.Item>
	)
}
