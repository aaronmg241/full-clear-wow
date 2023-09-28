import { Button, Menu, rem } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

type Props = {
	children: React.ReactNode
}

export default function MenuButton({ children }: Props) {
	return (
		<Menu.Target>
			<Button
				mr='1rem'
				variant='subtle'
				color='indigo.5'
				rightIcon={<IconChevronDown size={rem(20)} />}
				styles={(theme) => ({
					root: {
						'&:not([data-disabled])': theme.fn.hover({
							color: theme.colors.gray[0],
						}),
					},
				})}
			>
				{children}
			</Button>
		</Menu.Target>
	)
}
