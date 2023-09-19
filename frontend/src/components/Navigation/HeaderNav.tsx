import { useContext, useEffect, useState } from 'react'
import { Flex, Button, Menu, rem } from '@mantine/core'
import { IconPower, IconChevronDown, IconEdit } from '@tabler/icons-react'

import useAxiosWithInterceptor from '../../hooks/useAxios'
import { LoginContext } from '../LoginContext'

type Props = {}

export default function HeaderNav({}: Props) {
	const { setLoggedIn } = useContext(LoginContext)
	const [data, setData] = useState('')
	const axios = useAxiosWithInterceptor()

	// const { isLoading, error, data } = useQuery({ queryKey: ['user'], queryFn: getUser })

	useEffect(() => {
		axios.get('/guilds/user/').then((response) => {
			setData(response.data)
		})
	}, [])

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
						{data}
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item style={{}} icon={<IconEdit size={rem(20)} />}>
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
		</Flex>
	)
}
