import { Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import HeaderNav from '../components/Navigation/HeaderNav'
import SideNav from '../components/Navigation/SideNav'
import { useMediaQuery } from '@mantine/hooks'
import NewGuildForm from '../components/Forms/NewGuildForm'
import { useGuildStore } from '../hooks/useGuildStore'

export default function Home() {
	const isSmallScreen = useMediaQuery('(max-width: 768px)')
	const guilds = useGuildStore((state) => state.guilds)

	if (isSmallScreen) {
		return (
			<Flex w='100%' align='center' h='100%' direction='column'>
				<HeaderNav />
				<Flex
					style={{ flexGrow: 1, alignItems: 'start', width: '100%', boxSizing: 'border-box' }}
					p='0.5rem 1rem 1rem 2rem'
					direction='column'
					gap='max(2rem, 4vh)'
				>
					{guilds.length === 0 ? <NewGuildForm /> : <Outlet />}
				</Flex>
			</Flex>
		)
	}

	return (
		<Flex w='100%' align='center' h='100%' direction='column'>
			<HeaderNav />
			<Flex w='min(88em, 100vw)' h='100%' p='1rem 2rem'>
				<SideNav />
				<Flex style={{ flexGrow: 1 }} p='1rem 1rem 1rem 2rem' direction='column' gap='max(2rem, 4vh)'>
					{guilds.length === 0 ? <NewGuildForm /> : <Outlet />}
				</Flex>
			</Flex>
		</Flex>
	)
}
