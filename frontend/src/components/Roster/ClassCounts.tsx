import { Flex, HoverCard, Button, Text } from '@mantine/core'
import { classes } from '../../types/data/Classes'
import { useGuildStore } from '../../hooks/useGuildStore'

type Props = {}

function countClasses(roster: Character[]) {
	const classCounts: { [key: string]: number } = {}

	roster.forEach((character) => {
		classCounts[character.characterClass] = classCounts[character.characterClass] ? classCounts[character.characterClass] + 1 : 1
	})

	return classCounts
}

export default function ClassCounts({}: Props) {
	const guildRoster = useGuildStore((state) => state.guildRoster)
	const classCounts = countClasses(guildRoster)

	return (
		<HoverCard openDelay={300}>
			<HoverCard.Target>
				<Button variant='subtle' color='indigo.4'>
					View Class Counts
				</Button>
			</HoverCard.Target>
			<HoverCard.Dropdown style={{ borderColor: 'transparent' }}>
				{Object.keys(classes).map((key) => {
					const count = classCounts[key] ? classCounts[key] : 0

					return (
						<Flex gap='0.5rem' align='center' key={key}>
							<Text color={count === 0 ? 'var(--danger-red)' : 'gray.4'} fz={14}>
								{count}
							</Text>
							<Text
								color={classes[key].color}
								fz='14px'
								display='block'
								maw='100%'
								style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
							>
								{classes[key].readableName}
							</Text>
						</Flex>
					)
				})}
			</HoverCard.Dropdown>
		</HoverCard>
	)
}
