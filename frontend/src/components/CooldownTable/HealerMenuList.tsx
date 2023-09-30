import { useState } from 'react'
import { Menu } from '@mantine/core'

import { useGuildStore } from '../../hooks/useGuildStore'
import HealerPopover from './HealerPopover'

type Props = {
	rowIndex: number
	columnIndex: number
	closeMenu: () => void
}

export default function HealerMenuList({ rowIndex, columnIndex, closeMenu }: Props) {
	const bossRoster = useGuildStore((state) => state.bossRoster)
	const healers = bossRoster.filter((character) => character.role === 'healer')

	const [currHealer, setCurrHealer] = useState<string | null>(null)

	return (
		<>
			<Menu.Label>Healers</Menu.Label>
			{healers.map((healer) => {
				return (
					<HealerPopover
						character={healer}
						key={healer.id}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
						closeMenu={closeMenu}
						currHealer={currHealer}
						onClick={() => setCurrHealer(healer.id)}
					/>
				)
			})}
		</>
	)
}
