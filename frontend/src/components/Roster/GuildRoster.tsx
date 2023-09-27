import { useContext, useMemo, useEffect } from 'react'
import { Flex, Text, Paper, SimpleGrid } from '@mantine/core'
import { shallow } from 'zustand/shallow'

import { useGuildStore } from '../../hooks/useGuildStore'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import CreateCharacter from '../Modals/CreateCharacter'
import GuildRosterCharacter from './GuildRosterCharacter'

import { roles } from '../../types/data/Roles'
import { groupCharacters, sortRoster } from '../../utils/roster'
import ClassCounts from './ClassCounts'

type Props = {}

export default function GuildRoster({}: Props) {
	const { guildRoster, setGuildRoster } = useGuildStore(
		(state) => ({ guildRoster: state.guildRoster, setGuildRoster: state.setGuildRoster }),
		shallow
	)
	const { currGuild } = useContext(CurrentGuildContext)
	const sortedGuildRoster = useMemo<Character[]>(() => sortRoster(guildRoster), [guildRoster])
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

	const groupedCharacters = groupCharacters(sortedGuildRoster)

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='space-between' mb='1rem'>
				<Text fz={22} fw='bold'>
					{currGuild && currGuild.name} Roster
				</Text>
				<Flex gap='0.5rem'>
					<ClassCounts />
					<CreateCharacter />
				</Flex>
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%' mih='240px'>
					{roles.map((role) => {
						return (
							<div key={role.label}>
								<Text>{role.label}</Text>
								{groupedCharacters[role.key].map((character) => {
									return <GuildRosterCharacter key={character.id} character={character} />
								})}
							</div>
						)
					})}
				</SimpleGrid>
			</Paper>
		</Flex>
	)
}
