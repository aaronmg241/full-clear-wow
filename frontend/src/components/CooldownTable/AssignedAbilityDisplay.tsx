import { Flex, Text } from '@mantine/core'
import { motion } from 'framer-motion'

import { classes } from '../../types/data/Classes'

export default function AssignedAbilityDisplay({ ability, character }: { ability: Ability; character: Character }) {
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
