import '../App.css'
import { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import LoginButton from '../components/Button/LoginButton'
import { IconWind } from '@tabler/icons-react'
import { LoginContext } from '../components/LoginContext'

import { Paper, createStyles, TextInput, PasswordInput, Anchor, rem, Flex, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
	wrapper: {
		height: '100%',
	},

	form: {
		borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
		minHeight: rem(900),
		width: 'min(50vw, 600px)',
		paddingTop: rem(80),
		background: theme.colors.dark[8],

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: '50px',
	},
}))

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { setLoggedIn } = useContext(LoginContext)

	const { classes } = useStyles()

	return (
		<Flex w='100%' align='center'>
			<Paper className={classes.form} radius={0} p={30} pt='15vh'>
				<Flex gap='10px' mb={30} style={{ alignSelf: 'center' }} justify='center' align='center'>
					<IconWind style={{ color: '#4F7CAC', height: 60, width: 60 }} />
					<Text fw='bold' color='white' fz='40px'>
						FullClear
					</Text>
				</Flex>

				<TextInput
					label='Email address'
					placeholder='hello@gmail.com'
					size='md'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					mt='md'
					size='md'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Flex direction='column' gap='20px' mt='20px'>
					<LoginButton email={email} password={password} setLoggedIn={setLoggedIn} />
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							axios
								.post('dj-rest-auth/google/', { access_token: credentialResponse.credential }, { withCredentials: true })
								.then(() => {
									setLoggedIn(true)
								})
								.catch((error) => {
									console.log(error)
								})
						}}
						onError={() => {
							console.log('Login Failed')
						}}
					/>
				</Flex>

				<Text ta='center' mt='md'>
					Don&apos;t have an account?{' '}
					<Anchor<'a'> href='#' weight={700} onClick={(event) => event.preventDefault()}>
						Register
					</Anchor>
				</Text>
			</Paper>
		</Flex>
	)
}

export default Login
