import { Flex, Text } from '@mantine/core'
import { motion } from 'framer-motion'

import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'

export default function CustomInstructionDisplay({ assignedCooldown }: { assignedCooldown: AssignedCooldown }) {
	const bossRoster = useGuildStore((state) => state.bossRoster)

	const character = assignedCooldown.forEveryone ? null : bossRoster.find((character) => character.id === assignedCooldown.character)

	return (
		<motion.div initial={{ opacity: 0.6, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
			<Flex align='start' maw='100%' direction='column' style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
				<Text color={character ? classes[character.characterClass]?.color : '#C1C2C5'} fz='12px' display='block'>
					{character ? character.name : 'Everyone'}
				</Text>
				<Text color='white' fz='14px' display='block'>
					{assignedCooldown.customInstruction}
				</Text>
			</Flex>
		</motion.div>
	)
}
