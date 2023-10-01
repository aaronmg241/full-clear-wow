import { Modal, Button, TextInput, Select, rem, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { IconPlus } from '@tabler/icons-react'

import BossDisplay from '../BossDisplay'
import { plans } from '../../types/data/Plans'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { useContext, useState } from 'react'
import { CurrentGuildContext } from '../Contexts/CurrentGuildContext'
import { notifications } from '@mantine/notifications'
import { useGuildStore } from '../../hooks/useGuildStore'

const bossData = plans
	.map((plan) => plan.boss)
	.map((boss: Boss) => {
		return { value: boss.id.toString(), label: boss.name, boss }
	})

export default function CreateBossPlan() {
	const [opened, { open, close }] = useDisclosure(false)
	const [loading, setLoading] = useState(false)
	const bossPlans = useGuildStore((state) => state.bossPlans)
	const setBossPlans = useGuildStore((state) => state.setBossPlans)
	const setCurrBossPlan = useGuildStore((state) => state.setCurrBossPlan)
	const { currGuild } = useContext(CurrentGuildContext)
	const jwtAxios = useAxiosWithInterceptor()
	const form = useForm({
		initialValues: {
			planName: '',
			boss: bossData[0].value,
			difficulty: 'Mythic',
		},
		validate: {
			planName: (value: string) => {
				if (value.length === 0) return 'Plan name is required.'
			},
			boss: (value: string) => {
				if (value.length === 0) return 'Boss is required.'
			},
		},
	})

	return (
		<>
			<Button
				variant='subtle'
				onClick={() => {
					form.setFieldValue('planName', '')
					open()
				}}
				leftIcon={<IconPlus size={rem(20)} />}
				color='indigo.4'
			>
				Add New Plan
			</Button>
			<Modal
				opened={opened}
				onClose={() => {
					close()
					form.setFieldValue('planName', '')
				}}
			>
				<form
					onSubmit={form.onSubmit(async () => {
						if (!currGuild) return
						setLoading(true)
						jwtAxios
							.post(`/guilds/${currGuild.id}/plans/`, {
								name: form.values.planName,
								bossId: parseInt(form.values.boss),
								difficulty: form.values.difficulty.toLowerCase(),
								rows: plans.find((plan) => plan.boss.id === parseInt(form.values.boss))?.rows,
							})
							.then((response) => {
								notifications.show({
									title: 'Success',
									message: 'Plan successfully created.',
									color: 'green',
									autoClose: 3000,
								})
								setBossPlans([...bossPlans, response.data])
								setCurrBossPlan(response.data)
								close()
							})
							.catch(() => {
								notifications.show({
									title: 'Error',
									message: 'There was an error creating the plan.',
									color: 'red',
									autoClose: 4000,
								})
							})
							.finally(() => setLoading(false))
					})}
				>
					<TextInput label='Plan Name' size='sm' {...form.getInputProps('planName')} data-autofocus maxLength={24} />
					<Flex gap='1rem' mt='1rem'>
						<Select
							withinPortal
							label='Boss'
							data={bossData}
							itemComponent={BossDisplay}
							{...form.getInputProps('boss')}
							onChange={(newBossValue: string) => {
								form.setFieldValue('boss', newBossValue)
							}}
						/>
						<Select
							label='Difficulty'
							searchable
							withinPortal
							data={['Mythic', 'Heroic']}
							{...form.getInputProps('difficulty')}
						/>
					</Flex>
					<Button mt='1rem' ml='auto' display='block' type='submit' loading={loading}>
						Create Plan
					</Button>
				</form>
			</Modal>
		</>
	)
}
