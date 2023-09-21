import { useContext } from 'react'
import { Flex, Button, Menu, rem } from '@mantine/core'
import { IconPower, IconChevronDown, IconEdit } from '@tabler/icons-react'
import { useMediaQuery, useDisclosure } from '@mantine/hooks'

import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { LoginContext } from '../Account/LoginContext'
import MobileNav from './MobileNav'
import ChangeDisplayName from '../Modals/ChangeDisplayName'

type Props = {}

export default function HeaderNav({}: Props) {
	const { setLoggedIn, userDisplayName, setUserDisplayName } = useContext(LoginContext)
	const [opened, { open, close }] = useDisclosure(false)
	const isSmallScreen = useMediaQuery('(max-width: 768px)')

	const axios = useAxiosWithInterceptor()

	// const { isLoading, error, data } = useQuery({ queryKey: ['user'], queryFn: getUser })

	return (
		<Flex w='min(100%, 88em)' h='50px' p='1rem 2rem 0 2rem' justify='flex-end' align='center' gap='4px'>
			<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 150 }}>
				<Menu.Target>
					<Button
						variant='subtle'
						color='dark'
						rightIcon={<IconChevronDown size={rem(20)} />}
						styles={(theme) => ({
							root: {
								'&:not([data-disabled])': theme.fn.hover({
									color: theme.colors.gray[0],
								}),
							},
						})}
					>
						{userDisplayName}
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item onClick={open} icon={<IconEdit size={rem(20)} />}>
						Change Display Name
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item
						style={{ color: 'var(--danger-red)', opacity: 0.8 }}
						icon={<IconPower size={rem(20)} />}
						onClick={() => {
							axios
								.post('/dj-rest-auth/logout/')
								.then(() => {
									setLoggedIn(false)
								})
								.catch((error) => {
									console.log(error)
								})
						}}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
			<ChangeDisplayName opened={opened} close={close} userDisplayName={userDisplayName} setUserDisplayName={setUserDisplayName} />
			{isSmallScreen && <MobileNav />}
		</Flex>
	)
}
