import { Menu, Text, UnstyledButton, rem } from '@mantine/core'
import CharacterDisplay from './CharacterDisplay'
import { IconX, IconEdit } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { classes } from '../types/Classes'
import useAxiosWithInterceptor from '../hooks/useAxiosWithInterceptor'
import { useGuildStore } from '../hooks/useGuildStore'
import { notifications } from '@mantine/notifications'
import EditCharacter from './Modals/EditCharacter'
import { useDisclosure } from '@mantine/hooks'

type Props = {
	character: Character
}

export default function GuildRosterCharacter({ character }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const currGuild = useGuildStore((state) => state.currGuild)
	const removeCharacterFromRoster = useGuildStore((state) => state.removeCharacterFromRoster)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)

	const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure()

	const handleRemove = () => {
		if (!currGuild) return

		jwtAxios.delete(`guilds/${currGuild.id}/characters/${character.id}/`).catch((error) => {
			console.log(error)
			addCharacterToRoster(character)
			notifications.show({
				title: 'Error',
				message: 'There was an error deleting the user.',
				color: 'red',
				autoClose: 5000,
			})
		})
		removeCharacterFromRoster(character)
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
