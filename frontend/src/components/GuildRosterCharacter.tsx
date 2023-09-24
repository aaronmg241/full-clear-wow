import { useContext } from 'react'
import { Menu, Text, UnstyledButton, rem } from '@mantine/core'
import CharacterDisplay from './CharacterDisplay'
import { IconX, IconEdit } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { classes } from '../types/Classes'
import { useGuildStore } from '../hooks/useGuildStore'
import EditCharacter from './Modals/EditCharacter'
import { useDisclosure } from '@mantine/hooks'
import { RosterContext } from './Contexts/RosterContext'

type Props = {
	character: Character
}

export default function GuildRosterCharacter({ character }: Props) {
	const currGuild = useGuildStore((state) => state.currGuild)
	const { sendRosterUpdate } = useContext(RosterContext)

	const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure()

	const handleRemove = () => {
		if (!currGuild) return

		sendRosterUpdate({
			...character,
			shouldDelete: true,
		})
	}

	return (
		<>
			<Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
				<motion.div initial={{ opacity: 0.8, y: 2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
					<Menu.Target>
						<UnstyledButton w='100%'>
							<CharacterDisplay character={character} />
						</UnstyledButton>
					</Menu.Target>
				</motion.div>
				<Menu.Dropdown miw='200px'>
					<Menu.Label>
						Options<Text color={classes[character.characterClass]?.color}>{character.name}</Text>
					</Menu.Label>
					<Menu.Item icon={<IconEdit size={rem(20)} />} onClick={openEdit}>
						Edit
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item color='var(--danger-red)' icon={<IconX size={rem(20)} />} onClick={handleRemove}>
						Remove
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
			<EditCharacter character={character} close={closeEdit} opened={editOpened} />
		</>
	)
}
