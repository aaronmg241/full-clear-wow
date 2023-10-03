import { Text, Menu } from '@mantine/core'

import { useGuildStore } from '../../hooks/useGuildStore'
import MenuButton from '../Buttons/MenuButton'

type Props = {}

export default function PlanMenu({}: Props) {
	const currBossPlan = useGuildStore((state) => state.currBossPlan)
	const setCurrBossPlan = useGuildStore((state) => state.setCurrBossPlan)
	const bossPlans = useGuildStore((state) => state.bossPlans)

	if (!currBossPlan) return null

	return (
		<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 75 }}>
			<MenuButton>
				<Text maw='20vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
					{currBossPlan.name}
				</Text>
			</MenuButton>
			<Menu.Dropdown miw={200}>
				{bossPlans.map((bossPlan) => {
					return (
						<Menu.Item
							key={bossPlan.id}
							value={bossPlan.id}
							onClick={() => setCurrBossPlan(bossPlan)}
							bg={currBossPlan === bossPlan ? 'rgba(92, 95, 102, 0.35)' : ''}
						>
							{bossPlan.name}
						</Menu.Item>
					)
				})}
			</Menu.Dropdown>
		</Menu>
	)
}
