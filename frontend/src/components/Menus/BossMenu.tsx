import { Text, Menu, Button, rem } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import { bosses } from '../../types/Raid'

type Props = {}

export default function BossMenu({}: Props) {
	return (
		<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 150 }}>
			<Menu.Target>
				<Button
					mr='1rem'
					variant='subtle'
					color='indigo.5'
					rightIcon={<IconChevronDown size={rem(20)} />}
					styles={(theme) => ({
						root: {
							'&:not([data-disabled])': theme.fn.hover({
								color: theme.colors.gray[0],
							}),
						},
					})}
				>
					<Text maw='20vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
						test
					</Text>
				</Button>
			</Menu.Target>
			<Menu.Dropdown miw={200}>
				{bosses.map((boss) => {
					return (
						<Menu.Item key={boss.id} value={boss.id}>
							{boss.name}
						</Menu.Item>
					)
				})}
			</Menu.Dropdown>
		</Menu>
	)
}
