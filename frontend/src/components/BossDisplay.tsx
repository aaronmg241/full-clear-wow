import { Flex } from '@mantine/core'
import { forwardRef } from 'react'

// type Props = {
// 	boss: Boss
// }

interface Props extends React.ComponentPropsWithoutRef<'div'> {
	boss: Boss
}

const BossDisplay = forwardRef<HTMLDivElement, Props>(({ boss, ...others }: Props, ref) => {
	return (
		<Flex gap='0.5rem' align='center' ref={ref} {...others}>
			<img src={`../assets/bosses/${boss.iconPath}`} style={{ height: 24, width: 24 }} />
			{boss.name}
		</Flex>
	)
})

export default BossDisplay
