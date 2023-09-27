import { useContext } from 'react'
import { Menu, Button, rem, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconShare, IconPlus, IconSettings } from '@tabler/icons-react'

import { useGuildStore } from '../../hooks/useGuildStore'
import AddGuild from '../Modals/AddGuild'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'

type Props = {}

export default function GuildMenu({}: Props) {
	const guilds = useGuildStore((state) => state.guilds)
	const { currGuild, setCurrGuild } = useContext(CurrentGuildContext)
	const jwtAxios = useAxiosWithInterceptor()

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
						<Text maw='20vw' style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap' }}>
							{currGuild.name}
						</Text>
					</Button>
				</Menu.Target>
				<Menu.Dropdown miw={200}>
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
					<Menu.Label mt='1rem'>Your Other Guilds</Menu.Label>
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
						<Menu.Item icon={<IconPlus size={rem(20)} />} mt='1rem' onClick={openNewGuildModal}>
							Add Guild
						</Menu.Item>
					)}
				</Menu.Dropdown>
			</Menu>
			<AddGuild opened={newGuildModalOpened} close={closeNewGuildModal} />
		</>
	)
}
