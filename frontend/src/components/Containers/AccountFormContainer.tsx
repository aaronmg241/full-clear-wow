import { Paper, createStyles, Flex, Text } from '@mantine/core'
import { IconWind } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
	form: {
		borderRadius: '0.5rem',
		width: 'min(50vw, 500px)',
		background: theme.colors.dark[8],

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
		},
	},
}))

export default function AccountFormContainer({ children }: { children: React.ReactNode }) {
	const { classes } = useStyles()

	return (
		<Flex w='100%' h='100%' align='center' justify='center'>
			<Paper className={classes.form} radius={0} p='4rem 4rem' style={{ overflow: 'hidden' }}>
				<Flex gap='10px' mb={30} style={{ alignSelf: 'center' }} justify='center' align='center'>
					<IconWind style={{ color: '#4F7CAC', height: 60, width: 60 }} />
					<Text fw='bold' color='white' fz='40px'>
						FullClear
					</Text>
				</Flex>
				{children}
			</Paper>
		</Flex>
	)
}
