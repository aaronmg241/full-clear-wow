import '../App.css'
import { useState } from 'react'
import { IconWind } from '@tabler/icons-react'

import { Paper, createStyles, Flex, Text } from '@mantine/core'
import LoginForm from '../components/Account/LoginForm'
import RegisterForm from '../components/Account/RegisterForm'
import ResetPasswordForm from '../components/Account/ResetPasswordForm'

import { motion } from 'framer-motion'

const useStyles = createStyles((theme) => ({
	form: {
		borderRadius: '0.5rem',
		width: 'min(50vw, 500px)',
		background: theme.colors.dark[8],

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: '48px',
	},
}))

function Login() {
	const [stage, setStage] = useState('login')

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

				{stage === 'login' && (
					<motion.div
						initial={{ opacity: 0.5, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: 'tween', duration: 0.4 }}
					>
						<LoginForm setStage={setStage} />
					</motion.div>
				)}
				{stage === 'register' && (
					<motion.div
						initial={{ opacity: 0.5, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: 'tween', duration: 0.4 }}
					>
						<RegisterForm setStage={setStage} />
					</motion.div>
				)}
				{stage === 'resetpassword' && (
					<motion.div
						initial={{ opacity: 0.5, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: 'tween', duration: 0.4 }}
					>
						<ResetPasswordForm setStage={setStage} />
					</motion.div>
				)}
			</Paper>
		</Flex>
	)
}

export default Login
