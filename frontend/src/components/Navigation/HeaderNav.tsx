import { useContext } from 'react'
import { Flex, Button, Menu, rem } from '@mantine/core'
import { IconPower, IconChevronDown, IconEdit, IconSettings, IconPlus, IconShare } from '@tabler/icons-react'
import { useMediaQuery, useDisclosure } from '@mantine/hooks'

import { LoginContext } from '../Account/LoginContext'
import MobileNav from './MobileNav'
import ChangeDisplayName from '../Modals/ChangeDisplayName'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { notifications } from '@mantine/notifications'
import AddGuild from '../Modals/AddGuild'
import { useGuildStore } from '../../hooks/useGuildStore'

type Props = {}

export default function HeaderNav({}: Props) {
	const jwtAxios = useAxiosWithInterceptor()
	const { logout, userDisplayName, setUserDisplayName } = useContext(LoginContext)
	const [changeNameModalOpened, { open: openChangeNameModal, close: closeChangeNameModal }] = useDisclosure(false)
	const [newGuildModalOpened, { open: openNewGuildModal, close: closeNewGuildModal }] = useDisclosure(false)
	const isSmallScreen = useMediaQuery('(max-width: 768px)')
	const guilds = useGuildStore((state) => state.guilds)
	const currGuild = useGuildStore((state) => state.currGuild)
	const setCurrGuild = useGuildStore((state) => state.setCurrGuild)

	return (
		<Flex w='min(100%, 88em)' h='50px' p='1rem 2rem 0 2rem' justify='flex-end' align='center' gap='4px'>
			{/* Guild Menu */}
			{guilds.length > 0 && currGuild && (
				<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 150 }}>
					<Menu.Target>
						<Button
							mr='1rem'
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
							{currGuild.name}
						</Button>
					</Menu.Target>
					<Menu.Dropdown miw={200}>
						<Menu.Item
							icon={<IconShare size={rem(20)} />}
							onClick={() => {
								jwtAxios
									.post('/guilds/share/', { guild_id: guilds[0].id })
									.then((response) => {
										const code = response.data
										navigator.clipboard.writeText(
											`${window.location.protocol}//${window.location.host}/guilds/invite/${code}/`
										)
										notifications.show({
											title: 'Success',
											message: 'Invite link copied to clipboard. It will expire after 24 hours.',
											color: 'green',
											autoClose: 4000,
										})
									})
									.catch((error) => {
										console.log(error)
										notifications.show({
											title: 'Error',
											message: 'There was an error creating the code.',
											color: 'red',
											autoClose: 5000,
										})
									})
							}}
						>
							Invite Members
						</Menu.Item>
						<Menu.Item icon={<IconSettings size={rem(20)} />}>Guild Settings</Menu.Item>
						<Menu.Label mt='1rem'>Your Other Guilds</Menu.Label>
						{guilds
							.filter((guild) => guild.id !== currGuild.id)
							.map((guild) => {
								return (
									<Menu.Item key={guild.id} onClick={() => setCurrGuild(guild)}>
										{guild.name}
									</Menu.Item>
								)
							})}
						<Menu.Item icon={<IconPlus size={rem(20)} />} mt='1rem' onClick={openNewGuildModal}>
							Add Guild
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}

			{/* Account Menu */}
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
			{isSmallScreen && <MobileNav />}

			{/* Modals */}
			<ChangeDisplayName
				opened={changeNameModalOpened}
				close={closeChangeNameModal}
				userDisplayName={userDisplayName}
				setUserDisplayName={setUserDisplayName}
			/>
			<AddGuild opened={newGuildModalOpened} close={closeNewGuildModal} />
		</Flex>
	)
}
