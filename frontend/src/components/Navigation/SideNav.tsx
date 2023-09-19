import { Flex } from '@mantine/core'
import { IconUsers, IconActivity } from '@tabler/icons-react'

import SideNavButton from '../Button/SideNavButton'

type Props = {}

export default function SideNav({}: Props) {
	return (
		<Flex h='100%' direction='column' gap={0} align='start'>
			<SideNavButton icon={<IconUsers />} path='/roster' label='Rosters' />
			<SideNavButton icon={<IconActivity />} path='/cooldowns' label='Cooldowns' />
		</Flex>
	)
}
