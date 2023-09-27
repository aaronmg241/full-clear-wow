import { notifications } from '@mantine/notifications'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useGuildStore } from '../../hooks/useGuildStore'
import CharacterDisplay from './CharacterDisplay'
import { UnstyledButton } from '@mantine/core'
import { useContext } from 'react'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'
import { WebsocketContext } from '../Contexts/WebsocketContext'

type Props = {
	character: Character
	isBench?: boolean
}

export default function BossRosterCharacter({ character, isBench }: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const { currGuild } = useContext(CurrentGuildContext)
	const { sendBossRosterUpdate } = useContext(WebsocketContext)
	const currBoss = useGuildStore((state) => state.currBoss)
	const addCharacterToBossRoster = useGuildStore((state) => state.addCharacterToBossRoster)
	const removeCharacterFromBossRoster = useGuildStore((state) => state.removeCharacterFromBossRoster)

	async function handleClick() {
		if (!currGuild) return

		if (isBench) {
			addCharacterToBossRoster(character)
			jwtAxios
				.post(`/guilds/${currGuild.id}/boss_roster/${currBoss.id}/`, { character_id: character.id })
				.catch((error) => {
					console.log(error)
					notifications.show({
						title: 'Error',
						message: 'There was a server error adding the character to the roster.',
						color: 'red',
						autoClose: 5000,
					})
				})
				.then(() => {
					sendBossRosterUpdate({
						characterId: character.id,
						bossId: currBoss.id,
					})
				})
		} else {
			removeCharacterFromBossRoster(character.id)
			jwtAxios
				.delete(`/guilds/${currGuild.id}/boss_roster/${currBoss.id}/`, { data: { character_id: character.id } })
				.catch((error) => {
					console.log(error)
					notifications.show({
						title: 'Error',
						message: 'There was a server error removing the character from the roster.',
						color: 'red',
						autoClose: 5000,
					})
				})
				.then(() => {
					sendBossRosterUpdate({
						characterId: character.id,
						bossId: currBoss.id,
						shouldRemove: true,
					})
				})
		}
	}

	return (
		<UnstyledButton onClick={handleClick} style={{ display: 'block' }}>
			<CharacterDisplay character={character} />
		</UnstyledButton>
	)
}
