import { secondsToMMSS } from '../../utils/cooldowns'
import CooldownMenu from '../Menus/CooldownMenu/CooldownMenu'

type Props = {
	row: BossPlanRow
	rowIndex: number
}

function findNumRows(row: BossPlanRow) {
	let numRows = 1

	for (const cooldown of row.assignedCooldowns) {
		const rowsRequired = Math.ceil(cooldown.column / 6)
		if (rowsRequired > numRows) numRows = rowsRequired
	}

	return numRows
}

export default function Row({ row, rowIndex }: Props) {
	return (
		<tr>
			<td>{row.spellName}</td>
			<td>{secondsToMMSS(row.time)}</td>
			{Array.from({ length: 6 }).map((_, columnIndex) => {
				return (
					<td key={columnIndex} style={{ width: 120, maxWidth: 120 }}>
						<CooldownMenu row={row} rowIndex={rowIndex} columnIndex={columnIndex} />
					</td>
				)
			})}
		</tr>
	)
}
