import { Flex } from '@mantine/core'

type Props = {
	boss: Boss
}

export default function BossDisplay({ boss }: Props) {
	return (
		<Flex gap='0.5rem' align='center'>
			<img src={`../assets/bosses/${boss.iconPath}`} style={{ height: 24, width: 24 }} />
			{boss.name}
		</Flex>
	)
}
