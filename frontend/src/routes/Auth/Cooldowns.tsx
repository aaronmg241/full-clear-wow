import { Flex, Paper } from '@mantine/core'
import BossMenu from '../../components/Menus/BossMenu'

export default function Cooldowns() {
	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='space-between' mb='1rem'>
				<div></div>
				<Flex gap='0.5rem'>
					<BossMenu />
				</Flex>
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'></Paper>
		</Flex>
	)
}
