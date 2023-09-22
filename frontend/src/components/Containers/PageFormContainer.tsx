import { Paper, createStyles, Flex, Text } from '@mantine/core'
import { IconWind } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
	form: {
		borderRadius: '0.5rem',
		width: 'min(85vw, 500px)',
		background: theme.colors.dark[8],
		padding: '4rem',
		[theme.fn.smallerThan('md')]: {
			padding: '2rem',
		},
	},
	title: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 40,
		[theme.fn.smallerThan('md')]: {
			fontSize: 32,
		},
	},
	icon: {
		color: '#4F7CAC',
		height: 60,
		width: 60,
		[theme.fn.smallerThan('md')]: {
			height: 45,
			width: 45,
		},
	},
}))

export default function PageFormContainer({ children }: { children: React.ReactNode }) {
	const { classes } = useStyles()

	return (
		<Flex w='100%' h='100%' align='center' justify='center'>
			<Paper className={classes.form} p='4rem' style={{ overflow: 'hidden' }}>
				<Flex gap='10px' mb={30} style={{ alignSelf: 'center' }} justify='center' align='center'>
					<IconWind className={classes.icon} />
					<Text className={classes.title}>FullClear</Text>
				</Flex>
				{children}
			</Paper>
		</Flex>
	)
}
