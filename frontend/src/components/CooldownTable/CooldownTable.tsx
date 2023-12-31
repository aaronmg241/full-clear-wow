import { useContext } from 'react'
import { Paper, Table } from '@mantine/core'

import { useGuildStore } from '../../hooks/useGuildStore'
import Row from './Row'
import { RowsContext } from '../Contexts/RowsContext'

type Props = {}

export default function CooldownTable({}: Props) {
	const currBossPlan = useGuildStore((state) => state.currBossPlan)
	const { rows } = useContext(RowsContext)

	return (
		<Paper bg='dark.8' h='100%' p='1rem'>
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
						{rows.map((row, index) => {
							return <Row row={row} key={row.id} rowIndex={index} />
						})}
					</tbody>
				</Table>
			)}
		</Paper>
	)
}
