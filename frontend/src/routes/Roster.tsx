import { useEffect, useMemo } from 'react'
import { Flex, SimpleGrid, Paper, Text } from '@mantine/core'
import { shallow } from 'zustand/shallow'

import { useGuildStore } from '../hooks/useGuildStore'
import CreateCharacterForm from '../components/Modals/CreateCharacter'
import useAxiosWithInterceptor from '../hooks/useAxiosWithInterceptor'
import GuildRosterCharacter from '../components/GuildRosterCharacter'

type Props = {}

const roles = [
	{ key: 'tank', label: 'Tanks' },
	{ key: 'healer', label: 'Healers' },
	{ key: 'melee', label: 'Melee DPS' },
	{ key: 'ranged', label: 'Ranged DPS' },
]

function sortRoster(guildRoster: Character[]) {
	// Define a custom sorting function
	function customSort(a: Character, b: Character) {
		// Compare by class
		const classComparison = a.characterClass.localeCompare(b.characterClass)

		// If classes are the same, compare by spec
		if (classComparison === 0) {
			const specComparison = a.spec.localeCompare(b.spec)

			// If specs are the same, compare by name
			if (specComparison === 0) {
				return a.name.localeCompare(b.name)
			}

			return specComparison
		}

		return classComparison
	}

	// Sort the guildRoster array using the custom sorting function
	return guildRoster.sort(customSort)
}

export default function Roster({}: Props) {
	const { guildRoster, setGuildRoster, currGuild } = useGuildStore(
		(state) => ({ guildRoster: state.guildRoster, setGuildRoster: state.setGuildRoster, currGuild: state.currGuild }),
		shallow
	)
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

	const groupedCharacters: { [key: string]: Character[] } = {
		tank: [],
		healer: [],
		melee: [],
		ranged: [],
	}

	sortedGuildRoster.map((character) => {
		groupedCharacters[character.role].push(character)
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
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%'>
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
