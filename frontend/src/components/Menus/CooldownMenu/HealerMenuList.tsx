import { Menu } from '@mantine/core'

import { useGuildStore } from '../../../hooks/useGuildStore'
import HealerPopover from './HealerPopover'

type Props = {
	rowIndex: number
	columnIndex: number
	closeMenu: () => void
	currMenuOption: string | null
	setCurrMenuOption: (option: string | null) => void
}

export default function HealerMenuList({ rowIndex, columnIndex, closeMenu, currMenuOption, setCurrMenuOption }: Props) {
	const bossRoster = useGuildStore((state) => state.bossRoster)
	const healers = bossRoster.filter((character) => character.role === 'healer')

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
						currHealer={currMenuOption}
						onClick={() => setCurrMenuOption(healer.id)}
					/>
				)
			})}
		</>
	)
}
