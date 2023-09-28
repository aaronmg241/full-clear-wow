import { Flex, Paper, Table } from '@mantine/core'
import BossMenu from '../../components/Menus/BossMenu'
import { useGuildStore } from '../../hooks/useGuildStore'
import { plans } from '../../types/data/Plans'
import { secondsToMMSS } from '../../utils/cooldowns'
import CharacterDisplay from '../../components/Roster/CharacterDisplay'

export default function Cooldowns() {
	const currBoss = useGuildStore((state) => state.currBoss)
	const bossRoster = useGuildStore((state) => state.bossRoster)
	const rows = plans.find((plan) => plan.boss === currBoss)?.rows || []

	const healers = bossRoster.filter((character) => character.role === 'healer')

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='end' mb='1rem'>
				<BossMenu />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<Table highlightOnHover>
					<thead>
						<tr>
							<th>Ability</th>
							<th>Time</th>
							{healers.map((healer) => (
								<th>
									<CharacterDisplay character={healer} />
								</th>
							))}
							<th>Others</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							return (
								<tr>
									<td>{row.bossAbility}</td>
									<td>{secondsToMMSS(row.time)}</td>
									{healers.map(() => (
										<td></td>
									))}
									<td></td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Paper>
		</Flex>
	)
}
