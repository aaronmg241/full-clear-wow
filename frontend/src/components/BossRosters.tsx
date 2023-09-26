import { Flex, Text, Paper, SimpleGrid } from '@mantine/core'

import { roles } from '../types/Roles'
import BossMenu from './Menus/BossMenu'

type Props = {}

export default function BossRosters({}: Props) {
	return (
		<Flex direction='column' w='100%'>
			<Flex gap='1rem' justify='space-between' mb='1rem'>
				<Text fz={22} fw='bold'>
					Boss Rosters
				</Text>
				<BossMenu />
			</Flex>
			<Paper bg='dark.8' h='fit-content' p='1rem'>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%' mih='140px'>
					{roles.map((role) => {
						return (
							<div key={role.label}>
								<Text>{role.label}</Text>
							</div>
						)
					})}
				</SimpleGrid>
			</Paper>
			<Paper bg='dark.8' h='fit-content' p='1rem' mt='0.5rem'>
				<Text fz={18} fw='bold'>
					Bench
				</Text>
				<SimpleGrid cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }]} w='100%' mt='1rem' mih='140px'>
					{roles.map((role) => {
						return (
							<div key={role.label}>
								<Text>{role.label}</Text>
							</div>
						)
					})}
				</SimpleGrid>
			</Paper>
		</Flex>
	)
}
