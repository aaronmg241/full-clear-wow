import { Button, Flex, Text } from '@mantine/core'
import { motion } from 'framer-motion'

import { secondsToMMSS } from '../../utils/cooldowns'
import { classes } from '../../types/data/Classes'

export default function SpellCooldownDisplay({
	spellName,
	readableName,
	cooldownRemaining,
	character,
}: {
	spellName: string
	readableName: string
	cooldownRemaining: number
	character?: Character
}) {
	return (
		<motion.div initial={{ opacity: 0.6, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
			<Button
				style={{ borderRadius: 0, display: 'block' }}
				bg='transparent'
				fw='normal'
				h='fit-content'
				p='0 0.5rem'
				fullWidth
				styles={(theme) => ({
					root: {
						'&:not([data-disabled])': theme.fn.hover({
							background: 'var(--hover-indigo-bg)',
						}),
					},
					label: {
						width: '100%',
					},
				})}
			>
				<Flex align='center' w='100%'>
					<img src={`../assets/class_abilities/${spellName}.jpg`} style={{ height: 20, width: 20, marginRight: '1rem' }} />
					<Flex direction='column' w='100%'>
						<Flex gap='0.5rem' justify='space-between' w='100%'>
							<Text fz={12} color={cooldownRemaining == 0 ? 'var(--success-green)' : 'var(--danger-red)'}>
								{cooldownRemaining == 0 ? 'Ready' : secondsToMMSS(cooldownRemaining)}
							</Text>
							{character && (
								<Text color={classes[character.characterClass]?.color} fz='12px' display='block'>
									{character.name}
								</Text>
							)}
						</Flex>
						<Text fz={14}>{readableName}</Text>
					</Flex>
				</Flex>
			</Button>
		</motion.div>
	)
}
