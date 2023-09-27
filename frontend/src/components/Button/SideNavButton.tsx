import { Button, rem } from '@mantine/core'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

type Props = {
	label: String
	path: string
	icon: React.ReactNode
	onLinkClicked?: Function
}

export default function SideNavButton({ label, path, icon, onLinkClicked }: Props) {
	const navigate = useNavigate()
	const location = useLocation()

	const { guildId } = useParams()

	if (guildId) {
		path = `/${guildId}${path.length > 0 ? `/${path}` : ''}`
	}

	return (
		<Button
			variant='subtle'
			w='100%'
			style={{ display: 'flex', justifyContent: 'start', textDecoration: 'none' }}
			onClick={() => {
				navigate(path)
				if (onLinkClicked) onLinkClicked()
			}}
			leftIcon={icon}
			styles={(theme) => ({
				root: {
					// Don't want to worry about leading slashes
					color: location.pathname.replace('/', '') === path.replace('/', '') ? theme.colors.indigo[4] : theme.colors.gray[3],

					backgroundColor: 'transparent',
					border: 0,
					height: rem(42),
					'&:not([data-disabled])': theme.fn.hover({
						backgroundColor: 'transparent',
						color: theme.colors.indigo[4],
					}),
				},

				leftIcon: {
					marginRight: theme.spacing.md,
				},
			})}
		>
			{label}
		</Button>
	)
}
