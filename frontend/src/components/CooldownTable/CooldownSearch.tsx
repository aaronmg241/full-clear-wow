import { useMemo } from 'react'
import { Flex, ScrollArea } from '@mantine/core'

import SpellCooldownDisplay from './SpellCooldownDisplay'
import { useGuildStore } from '../../hooks/useGuildStore'
import { classes } from '../../types/data/Classes'
import { findRemainingCooldown } from '../../utils/cooldowns'

type Props = {
	searchValue: string
	rowIndex: number
	columnIndex: number
}

function findAllCooldowns(bossRoster: any, currBossPlan: BossPlan, rowIndex: number) {
	const cooldowns: any[] = []

	for (const character of bossRoster) {
		for (const ability of [
			...classes[character.characterClass].importantAbilities,
			...classes[character.characterClass].specs[character.spec].importantAbilities,
		]) {
			const cooldownRemaining = findRemainingCooldown(currBossPlan, rowIndex, character, ability)

			cooldowns.push({
				ability,
				character,
				cooldownRemaining,
			})
		}
	}

	cooldowns.sort((a, b) => a.ability.spellName.localeCompare(b.ability.spellName))
	cooldowns.sort((a, b) => a.cooldownRemaining - b.cooldownRemaining)

	return cooldowns
}

export default function CooldownSearch({ searchValue, rowIndex, columnIndex }: Props) {
	const bossRoster = useGuildStore((store) => store.bossRoster)
	const addCooldownToBossPlan = useGuildStore((store) => store.addCooldownToBossPlan)
	const currBossPlan = useGuildStore((store) => store.currBossPlan)

	if (!currBossPlan) return

	const allCooldowns = useMemo(() => findAllCooldowns(bossRoster, currBossPlan, rowIndex), [bossRoster, currBossPlan, rowIndex])

	const filteredCooldowns = useMemo(
		() =>
			allCooldowns.filter(
				(cooldown) =>
					cooldown.ability.readableName.toLowerCase().includes(searchValue.toLowerCase()) ||
					cooldown.character.name.toLowerCase().includes(searchValue.toLowerCase())
			),
		[searchValue, bossRoster]
	)

	return (
		<ScrollArea h={250} offsetScrollbars>
			<Flex direction='column' ml='0.75rem' gap='0.5rem' pr='0.5rem' mah='25rem'>
				{filteredCooldowns.map((cooldown) => (
					<SpellCooldownDisplay
						key={cooldown.ability.spellName + cooldown.character.name}
						spellName={cooldown.ability.spellName}
						readableName={cooldown.ability.readableName}
						cooldownRemaining={cooldown.cooldownRemaining}
						character={cooldown.character}
						onClick={() => {
							addCooldownToBossPlan(rowIndex, columnIndex, cooldown.character, cooldown.ability)
						}}
					/>
				))}
			</Flex>
		</ScrollArea>
	)
}
