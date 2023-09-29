import { Flex, HoverCard, UnstyledButton, Menu } from '@mantine/core'

import SpellCooldownDisplay from './SpellCooldownDisplay'
import CharacterDisplay from '../Roster/CharacterDisplay'
import { classes } from '../../types/data/Classes'

type Props = {
	character: Character
}

export default function HealerHoverCard({ character }: Props) {
	const abilities = classes[character.characterClass].specs[character.spec].importantAbilities

	return (
		<Menu.Item pt='0.25rem' pb='0.25rem' closeMenuOnClick={false}>
			<HoverCard position='right' offset={25} closeDelay={50} openDelay={100}>
				<HoverCard.Target>
					<UnstyledButton w='100%'>
						<CharacterDisplay character={character} />
					</UnstyledButton>
				</HoverCard.Target>
				<HoverCard.Dropdown p='0.5rem 0'>
					<Flex direction='column' gap='0.5rem'>
						{abilities.map((ability) => {
							return (
								<SpellCooldownDisplay
									key={ability.spellName}
									spellName={ability.spellName}
									readableName={ability.readableName}
									cooldownRemaining={0}
								/>
							)
						})}
					</Flex>
				</HoverCard.Dropdown>
			</HoverCard>
		</Menu.Item>
	)
}
