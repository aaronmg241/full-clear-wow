import { useContext } from 'react'
import { Menu, Button, rem, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconPower, IconEdit } from '@tabler/icons-react'

import { LoginContext } from '../Account/LoginContext'
import ChangeDisplayName from '../Modals/ChangeDisplayName'

type Props = {}

export default function AccountMenu({}: Props) {
	const { userDisplayName, setUserDisplayName, logout } = useContext(LoginContext)
	const [changeNameModalOpened, { open: openChangeNameModal, close: closeChangeNameModal }] = useDisclosure(false)

	return (
		<>
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
						<Text maw='20vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
							{userDisplayName}
						</Text>
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>Account</Menu.Label>
					<Menu.Item onClick={openChangeNameModal} icon={<IconEdit size={rem(20)} />}>
						Change Display Name
					</Menu.Item>
					<Menu.Item
						style={{ color: 'var(--danger-red)', opacity: 0.8 }}
						icon={<IconPower size={rem(20)} />}
						onClick={() => logout()}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>

			{/* Modals */}
			<ChangeDisplayName
				opened={changeNameModalOpened}
				close={closeChangeNameModal}
				userDisplayName={userDisplayName}
				setUserDisplayName={setUserDisplayName}
			/>
		</>
	)
}
