import { useEffect, useContext } from 'react'
import { Flex, Paper } from '@mantine/core'
import { useGuildStore } from '../../hooks/useGuildStore'
import CreateBossPlan from '../../components/Modals/CreateBossPlan'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { CurrentGuildContext } from '../../components/Contexts/CurrentGuildContext'
import { notifications } from '@mantine/notifications'
import PlanMenu from '../../components/Menus/PlanMenu'
import CooldownTable from '../../components/CooldownTable/CooldownTable'
import RowsContextProvider from '../../components/Contexts/RowsContext'

export default function Cooldowns() {
	const { currGuild } = useContext(CurrentGuildContext)
	const setCurrBossPlan = useGuildStore((state) => state.setCurrBossPlan)
	const setBossPlans = useGuildStore((state) => state.setBossPlans)
	const jwtAxios = useAxiosWithInterceptor()

	useEffect(() => {
		if (!currGuild) return
		jwtAxios
			.get(`/guilds/${currGuild.id}/plans/`)
			.then((response) => {
				setBossPlans(response.data)
				setCurrBossPlan(response.data[0])
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
				notifications.show({
					title: 'Error',
					message: 'There was an error getting your plans.',
					color: 'red',
					autoClose: 5000,
				})
			})
	}, [])

	return (
		<Flex direction='column' w='100%' h='100%'>
			<Flex gap='1rem' justify='end' mb='1rem'>
				<CreateBossPlan />
				<PlanMenu />
			</Flex>
			<RowsContextProvider>
				<CooldownTable />
			</RowsContextProvider>
		</Flex>
	)
}
