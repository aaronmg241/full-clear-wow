import { Text, Menu } from '@mantine/core'

import { bosses } from '../../types/data/Raid'
import { useGuildStore } from '../../hooks/useGuildStore'
import BossDisplay from '../BossDisplay'
import MenuButton from '../Button/MenuButton'

type Props = {}

export default function BossMenu({}: Props) {
	const currBoss = useGuildStore((state) => state.currBoss)
	const setCurrBoss = useGuildStore((state) => state.setCurrBoss)

	return (
		<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 75 }}>
			<MenuButton>
				<Text maw='20vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
					{currBoss.name}
				</Text>
			</MenuButton>
			<Menu.Dropdown miw={200}>
				{bosses.map((boss) => {
					return (
						<Menu.Item
							key={boss.id}
							value={boss.id}
							onClick={() => setCurrBoss(boss)}
							bg={currBoss === boss ? 'rgba(92, 95, 102, 0.35)' : ''}
						>
							<BossDisplay boss={boss} />
						</Menu.Item>
					)
				})}
			</Menu.Dropdown>
		</Menu>
	)
}
