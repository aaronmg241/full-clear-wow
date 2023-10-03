import { Flex } from '@mantine/core'
import { IconUsers, IconActivity } from '@tabler/icons-react'

import SideNavButton from '../Buttons/SideNavButton'

type Props = {
	onLinkClicked?: Function
}

export default function SideNav({ onLinkClicked }: Props) {
	return (
		<Flex h='100%' direction='column' gap={0} align='start' pt='2rem' style={{ boxSizing: 'border-box' }}>
			<SideNavButton icon={<IconUsers />} path={''} label='Rosters' onLinkClicked={onLinkClicked} />
			<SideNavButton icon={<IconActivity />} path={'cooldowns'} label='Cooldowns' onLinkClicked={onLinkClicked} />
		</Flex>
	)
}
