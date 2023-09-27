import { Flex, Text, Paper, SimpleGrid } from '@mantine/core'
import { useEffect, useContext } from 'react'

import { roles } from '../../types/data/Roles'
import BossMenu from '../Menus/BossMenu'
import { useGuildStore } from '../../hooks/useGuildStore'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'
import { notifications } from '@mantine/notifications'
import { groupCharacters } from '../../utils/roster'

import BossRosterCharacter from './BossRosterCharacter'

type Props = {}

export default function BossRosters({}: Props) {
	const { currGuild } = useContext(CurrentGuildContext)
	const currBoss = useGuildStore((state) => state.currBoss)
	const guildRoster = useGuildStore((state) => state.guildRoster)
	const bossRoster = useGuildStore((state) => state.bossRoster)
	const setBossRoster = useGuildStore((state) => state.setBossRoster)

	const jwtAxios = useAxiosWithInterceptor()

	useEffect(() => {
		if (!currGuild) return

		jwtAxios
			.get(`/guilds/${currGuild.id}/boss_roster/${currBoss.id}`)
			.then((response) => {
				setBossRoster(response.data)
			})
			.catch((error) => {
				console.log(error)
				notifications.show({
					title: 'Error',
					message: 'Failed to get boss roster',
					color: 'red',
					autoClose: 4000,
				})
			})
	}, [currBoss, currGuild])

	const inRoster = bossRoster ? groupCharacters(bossRoster) : groupCharacters([])
	const outRoster = bossRoster
		? groupCharacters(guildRoster.filter((char: Character) => !bossRoster.some((bossChar: Character) => bossChar.id === char.id)))
		: groupCharacters([])

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='space-between' mb='1rem'>
				<Text fz={22} fw='bold'>
					Boss Rosters
				</Text>
				<BossMenu />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem' mb='0.5rem'>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%' mih='140px'>
					{roles.map((role) => {
						return (
							<div key={role.label}>
								<Text>{role.label}</Text>

								{inRoster[role.key].map((character) => {
									return <BossRosterCharacter key={character.id} character={character} />
								})}
							</div>
						)
					})}
				</SimpleGrid>
			</Paper>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<Text fz={18} fw='bold'>
					Bench
				</Text>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%' mt='1rem' mih='140px'>
					{roles.map((role) => {
						return (
							<div key={role.label}>
								<Text>{role.label}</Text>

								{outRoster[role.key].map((character) => {
									return <BossRosterCharacter key={character.id} character={character} isBench />
								})}
							</div>
						)
					})}
				</SimpleGrid>
			</Paper>
		</Flex>
	)
}
