import { useContext } from 'react'
import { Menu, Button, rem, Text, Flex } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconChevronDown, IconShare, IconPlus, IconSettings, IconPower, IconEdit } from '@tabler/icons-react'

import { useGuildStore } from '../../hooks/useGuildStore'
import AddGuild from '../Modals/AddGuild'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'
import { LoginContext } from '../Account/LoginContext'

import ChangeDisplayName from '../Modals/ChangeDisplayName'

type Props = {}

export default function GuildMenu({}: Props) {
	const guilds = useGuildStore((state) => state.guilds)
	const isSmallScreen = useMediaQuery('(max-width: 500px)')
	const { currGuild, setCurrGuild } = useContext(CurrentGuildContext)
	const { userDisplayName, setUserDisplayName, logout } = useContext(LoginContext)
	const jwtAxios = useAxiosWithInterceptor()

	const [changeNameModalOpened, { open: openChangeNameModal, close: closeChangeNameModal }] = useDisclosure(false)
	const [newGuildModalOpened, { open: openNewGuildModal, close: closeNewGuildModal }] = useDisclosure(false)

	if (guilds.length == 0 || !currGuild) return

	return (
		<>
			<Menu shadow='md' position='bottom-end' transitionProps={{ transition: 'rotate-right', duration: 75 }}>
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
						<Text maw='50vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
							{currGuild.name}
						</Text>
					</Button>
				</Menu.Target>
				<Menu.Dropdown miw={200}>
					<Flex gap='2rem' direction={isSmallScreen ? 'column' : 'row'}>
						<Flex direction='column'>
							<Menu.Label>{currGuild.name}</Menu.Label>
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
						</Flex>

						<Flex direction='column' miw={200}>
							<Menu.Label>Your Other Guilds</Menu.Label>
							{guilds
								.filter((guild) => guild.id !== currGuild.id)
								.map((guild) => {
									return (
										<Menu.Item
											key={guild.id}
											onClick={() => {
												setCurrGuild(guild.id)
											}}
										>
											{guild.name}
										</Menu.Item>
									)
								})}
							{guilds.length < 5 && (
								<Menu.Item icon={<IconPlus size={rem(20)} />} onClick={openNewGuildModal}>
									Add Guild
								</Menu.Item>
							)}
							{/* Account Actions */}
							<Menu.Label mt='1rem'>Account</Menu.Label>
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
						</Flex>
					</Flex>
				</Menu.Dropdown>
			</Menu>

			{/* Modals */}
			<AddGuild opened={newGuildModalOpened} close={closeNewGuildModal} />
			<ChangeDisplayName
				opened={changeNameModalOpened}
				close={closeChangeNameModal}
				userDisplayName={userDisplayName}
				setUserDisplayName={setUserDisplayName}
			/>
		</>
	)
}
