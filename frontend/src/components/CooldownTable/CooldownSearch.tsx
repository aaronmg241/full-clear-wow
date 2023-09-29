import { useMemo } from 'react'
import { Flex, ScrollArea } from '@mantine/core'

import SpellCooldownDisplay from './SpellCooldownDisplay'
import { useGuildStore } from '../../hooks/useGuildStore'
import { classes } from '../../types/data/Classes'

type Props = {
	searchValue: string
}

function findAllCooldowns(bossRoster: any) {
	const cooldowns: any[] = []

	for (const character of bossRoster) {
		for (const ability of [
			...classes[character.characterClass].importantAbilities,
			...classes[character.characterClass].specs[character.spec].importantAbilities,
		]) {
			cooldowns.push({
				ability,
				character,
			})
		}
	}

	cooldowns.sort((a, b) => a.ability.spellName.localeCompare(b.ability.spellName))

	return cooldowns
}

export default function CooldownSearch({ searchValue }: Props) {
	const bossRoster = useGuildStore((store) => store.bossRoster)

	const allCooldowns = useMemo(() => findAllCooldowns(bossRoster), [bossRoster])

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
						cooldownRemaining={0}
						character={cooldown.character}
					/>
				))}
			</Flex>
		</ScrollArea>
	)
}
