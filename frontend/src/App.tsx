import './App.css'
import { useContext, useState } from 'react'
import { LoginContext } from './components/LoginContext'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { Flex, Input, Text } from '@chakra-ui/react'
import AirIcon from '@mui/icons-material/Air'
import LoginButton from './components/LoginButton'
import Home from './routes/Home'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { loggedIn, loadingAccount, setLoggedIn } = useContext(LoginContext)

	if (loadingAccount) {
		return <div />
	}

	if (loggedIn) {
		return <Home setLoggedIn={setLoggedIn} />
	}

	return (
		<Flex minHeight='100vh' width='100%' justifyContent='center' alignItems='center'>
			<Flex
				background='#211F2D'
				width='450px'
				height='560px'
				borderRadius='5px'
				p='20px'
				paddingTop='60px'
				flexDirection='column'
				gap='20px'
			>
				<Flex gap='10px' alignSelf='center' alignItems='center' pr='20px'>
					<AirIcon style={{ color: '#4F7CAC', height: 45, width: 45 }} />
					<Text fontSize='28px' fontWeight='semibold' color='white'>
						FullClear
					</Text>
				</Flex>

				<Input
					placeholder='Email'
					color='white'
					onChange={(e) => {
						setEmail(e.target.value)
					}}
					value={email}
				/>
				<Input
					placeholder='Password'
					color='white'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type='password'
				/>
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
		</Flex>
	)
}

export default App
