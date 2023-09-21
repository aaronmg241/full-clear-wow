import { useDisclosure } from '@mantine/hooks'
import { Burger, Drawer, Flex } from '@mantine/core'
import SideNav from './SideNav'

export default function MobileNav() {
	const [opened, { toggle }] = useDisclosure(false)
	const label = opened ? 'Close navigation' : 'Open navigation'

	return (
		<>
			<Burger opened={opened} onClick={toggle} aria-label={label} size='sm' color='#C1C2C5' ml='20px' style={{ zIndex: 9999 }} />
			<Drawer opened={opened} onClose={toggle} position='top' size='xs' withCloseButton={false} p={0}>
				<Flex maw='95%' align='center' direction='column' pt='10%'>
					<SideNav onLinkClicked={toggle} />
				</Flex>
			</Drawer>
		</>
	)
}
