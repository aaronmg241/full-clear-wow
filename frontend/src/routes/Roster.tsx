import { useContext, useEffect } from 'react'
import { Flex, SimpleGrid, Paper, Text } from '@mantine/core'
import { shallow } from 'zustand/shallow'

import { LoginContext } from '../components/Account/LoginContext'
import { useGuildStore } from '../hooks/useGuildStore'
import CreateCharacterForm from '../components/Forms/CreateCharacterForm'
import useAxiosWithInterceptor from '../hooks/useAxiosWithInterceptor'
import CharacterDisplay from '../components/CharacterDisplay'

type Props = {}

export default function Roster({}: Props) {
	const { currGuild } = useContext(LoginContext)
	const { guildRoster, setGuildRoster } = useGuildStore(
		(state) => ({ guildRoster: state.guildRoster, setGuildRoster: state.setGuildRoster }),
		shallow
	)
	const jwtAxios = useAxiosWithInterceptor()

	useEffect(() => {
		if (!currGuild) return

		jwtAxios
			.get('guilds/roster/', { params: { guild_id: currGuild.id } })
			.then((response) => {
				setGuildRoster(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [currGuild])

	const sortedCharacters: { [key: string]: Character[] } = {
		tank: [],
		healer: [],
		melee: [],
		ranged: [],
	}

	guildRoster.map((character) => {
		console.log(character)
		sortedCharacters[character.role].push(character)
	})

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='space-between' mb='1rem'>
				<Text fz={22} fw='bold'>
					Roster
				</Text>
				<CreateCharacterForm />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<SimpleGrid
					cols={4}
					breakpoints={[
						{ maxWidth: 'md', cols: 2 },
						{ maxWidth: 'xs', cols: 1 },
					]}
					w='100%'
				>
					<div>
						<Text>Tanks</Text>
						{sortedCharacters.tank.map((character) => {
							return <CharacterDisplay key={character.id} character={character} />
						})}
					</div>
					<div>
						<Text>Healers</Text>
						{sortedCharacters.healer.map((character) => {
							return <CharacterDisplay key={character.id} character={character} />
						})}
					</div>
					<div>
						<Text>Melee DPS</Text>
						{sortedCharacters.melee.map((character) => {
							return <CharacterDisplay key={character.id} character={character} />
						})}
					</div>
					<div>
						<Text>Ranged DPS</Text>
						{sortedCharacters.ranged.map((character) => {
							return <CharacterDisplay key={character.id} character={character} />
						})}
					</div>
				</SimpleGrid>
			</Paper>
		</Flex>
	)
}
