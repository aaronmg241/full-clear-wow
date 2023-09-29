import { Flex, Paper, Table } from '@mantine/core'
import BossMenu from '../../components/Menus/BossMenu'
import { useGuildStore } from '../../hooks/useGuildStore'
import { plans } from '../../types/data/Plans'
import Row from '../../components/CooldownTable/Row'

export default function Cooldowns() {
	const currBoss = useGuildStore((state) => state.currBoss)
	const bossRoster = useGuildStore((state) => state.bossRoster)
	const rows = plans.find((plan) => plan.boss === currBoss)?.rows || []

	const healers = bossRoster.filter((character) => character.role === 'healer')

	console.log(healers)

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='end' mb='1rem'>
				<BossMenu />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<Table>
					<thead>
						<tr>
							<th style={{ width: 200 }}>Ability</th>
							<th style={{ width: 50 }}>Time</th>
							{Array.from({ length: 6 }).map((_, index) => (
								<th style={{ maxWidth: '60px' }} key={index}></th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							return <Row row={row} healers={healers} key={row.id} />
						})}
					</tbody>
				</Table>
			</Paper>
		</Flex>
	)
}
