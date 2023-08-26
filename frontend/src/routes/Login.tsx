import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import AirIcon from '@mui/icons-material/Air'
import Cookies from 'js-cookie'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<Flex minHeight='100vh' width='100%' justifyContent='center' alignItems='center' outline='2px solid red'>
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
				<Button
					width='100%'
					onClick={async () => {
						axios
							.post('dj-rest-auth/login/', { email, password })
							.then((response) => {
								Cookies.set('accessKey', response.data.key, { expires: 30 })
							})
							.catch((error) => {
								console.log(error)
							})
					}}
				>
					Login
				</Button>
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						console.log(credentialResponse.credential)
						axios
							.post('/dj-rest-auth/google/', { access_token: credentialResponse.credential })
							.then((response) => {
								Cookies.set('accessKey', response.data.key, { expires: 30 })
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

export default Login