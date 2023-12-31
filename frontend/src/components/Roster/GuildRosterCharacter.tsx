import { useContext } from 'react'
import { Menu, Text, UnstyledButton, rem } from '@mantine/core'
import CharacterDisplay from './CharacterDisplay'
import { IconX, IconEdit } from '@tabler/icons-react'

import { classes } from '../../types/data/Classes'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useGuildStore } from '../../hooks/useGuildStore'
import { notifications } from '@mantine/notifications'
import EditCharacter from '../Modals/EditCharacter'
import { useDisclosure } from '@mantine/hooks'
import { WebsocketContext } from '../Contexts/WebsocketContext'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'

type Props = {
	character: Character
}

export default function GuildRosterCharacter({ character }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const removeCharacterFromRoster = useGuildStore((state) => state.removeCharacterFromRoster)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const { sendRosterUpdate } = useContext(WebsocketContext)
	const { currGuild } = useContext(CurrentGuildContext)

	const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure()

	const handleRemove = () => {
		if (!currGuild) return

		// Optimistaclly update state
		removeCharacterFromRoster(character.id)

		jwtAxios
			.delete(`guilds/${currGuild.id}/characters/${character.id}/`)
			.then(() => {
				sendRosterUpdate({
					id: character.id,
					shouldDelete: true,
				})
			})
			.catch((error) => {
				console.log(error)
				// Revert optimistic update
				addCharacterToRoster(character)
				notifications.show({
					title: 'Error',
					message: 'There was an error deleting the user.',
					color: 'red',
					autoClose: 5000,
				})
			})
	}

	return (
		<>
			<Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
				<Menu.Target>
					<UnstyledButton w='100%'>
						<CharacterDisplay character={character} />
					</UnstyledButton>
				</Menu.Target>
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
