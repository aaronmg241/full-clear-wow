import { useEffect } from 'react'
import { Flex, Paper, Table } from '@mantine/core'
import BossMenu from '../../components/Menus/BossMenu'
import { useGuildStore } from '../../hooks/useGuildStore'
import { plans } from '../../types/data/Plans'
import Row from '../../components/CooldownTable/Row'

export default function Cooldowns() {
	const currBossPlan = useGuildStore((state) => state.currBossPlan)
	const setCurrBossPlan = useGuildStore((state) => state.setCurrBossPlan)
	// const currBossPlan = plans.find((plan) => plan.boss === currBoss)?.rows || []

	useEffect(() => {
		if (!currBossPlan) {
			setCurrBossPlan({ rows: plans[0].rows })
		}
	}, [])

	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='end' mb='1rem'>
				<BossMenu />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				{currBossPlan && (
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
							{currBossPlan.rows.map((row, index) => {
								return <Row row={row} key={row.id} rowIndex={index} />
							})}
						</tbody>
					</Table>
				)}
			</Paper>
		</Flex>
	)
}
