import { secondsToMMSS } from '../../utils/cooldowns'
import CooldownMenu from '../Menus/CooldownMenu/CooldownMenu'

type Props = {
	row: BossPlanRow
	rowIndex: number
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
