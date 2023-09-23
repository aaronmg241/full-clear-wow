import { Flex } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import MobileNav from './MobileNav'
import AccountMenu from '../Menus/AccountMenu'
import GuildMenu from '../Menus/GuildMenu'

type Props = {}

export default function HeaderNav({}: Props) {
	const isSmallScreen = useMediaQuery('(max-width: 768px)')

	return (
		<Flex w='min(100%, 88em)' h='50px' p='1rem 2rem 0 2rem' justify='flex-end' align='center' gap='4px'>
			<GuildMenu />
			<AccountMenu />
			{isSmallScreen && <MobileNav />}
		</Flex>
	)
}
