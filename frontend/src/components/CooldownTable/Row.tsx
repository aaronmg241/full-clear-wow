import { secondsToMMSS } from '../../utils/cooldowns'
import CooldownMenu from '../Menus/CooldownMenu/CooldownMenu'
import TableRowMenu from '../Menus/TableRowMenu/TableRowMenu'

type Props = {
	row: BossPlanRow
	rowIndex: number
}

export default function Row({ row, rowIndex }: Props) {
	return (
		<>
			{Array.from({ length: row.rowsRequired }).map((_, index) => {
				return (
					<tr key={index}>
						{index == 0 ? (
							<>
								<td>
									<TableRowMenu row={row} rowIndex={rowIndex} />
								</td>
								<td>{secondsToMMSS(row.time)}</td>
							</>
						) : (
							<>
								<td style={{ borderTop: 0 }}></td>
								<td style={{ borderTop: 0 }}></td>
							</>
						)}
						{Array.from({ length: 6 }).map((_, columnIndex) => {
							return (
								<td key={columnIndex} style={{ width: 120, maxWidth: 120, borderTop: index === 0 ? '' : '0' }}>
									<CooldownMenu row={row} rowIndex={rowIndex} columnIndex={index * 6 + columnIndex} />
								</td>
							)
						})}
					</tr>
				)
			})}
		</>
	)
}
