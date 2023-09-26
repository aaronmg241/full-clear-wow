import { Flex, Text } from '@mantine/core'
import { classes } from '../types/data/Classes'

type Props = {
	character: Character
	hideIcon?: boolean
}

export default function CharacterDisplay({ character, hideIcon }: Props) {
	const { name, characterClass, spec } = character

	// const icon = getSpecIcon(characterClass, spec)
	const color = classes[characterClass]?.color

	return (
		<Flex gap='0.5rem' p='5px 2px' align='center' w='100%'>
			{!hideIcon && <img src={`../assets/classes/${characterClass}/${spec}.jpg`} style={{ height: 20, width: 20 }} />}
			<Text
				color={color}
				fz='14px'
				display='block'
				maw='100%'
				style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
			>
				{name}
			</Text>
		</Flex>
	)
}
