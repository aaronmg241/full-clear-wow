import { Flex, Text } from '@mantine/core'
import { motion } from 'framer-motion'

import { allImportantAbilities, classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'

export default function AssignedAbilityDisplay({ assignedCooldown }: { assignedCooldown: AssignedCooldown }) {
	const bossRoster = useGuildStore((state) => state.bossRoster)

	const character = bossRoster.find((character) => character.id === assignedCooldown.character)

	if (!character) return null

	const ability = allImportantAbilities.find((ability) => ability.spellID === assignedCooldown.spellId)

	if (!ability) return null

	return (
		<motion.div initial={{ opacity: 0.6, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
			<Flex align='center' w='100%'>
				<img src={`../assets/class_abilities/${ability.spellName}.jpg`} style={{ height: 22, width: 22, marginRight: '0.5rem' }} />
				<Text color={classes[character.characterClass]?.color} fz='14px' display='block'>
					{character.name}
				</Text>
			</Flex>
		</motion.div>
	)
}
