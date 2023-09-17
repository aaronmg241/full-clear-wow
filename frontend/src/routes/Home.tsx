import { Button } from '@chakra-ui/react'
import useAxiosWithInterceptor from '../hooks/useAxios'

type Props = {
	setLoggedIn: Function
}

export default function Home({ setLoggedIn }: Props) {
	const axios = useAxiosWithInterceptor()

	return (
		<>
			<div>Hello World</div>
			<Button
				onClick={() => {
					axios
						.get('/guilds/my-guilds/')
						.then((response) => {
							console.log(response)
						})
						.catch((error) => {
							console.log(error)
						})
				}}
			>
				Test API
			</Button>
			<Button
				onClick={() => {
					axios
						.post('/dj-rest-auth/logout/')
						.then(() => {
							setLoggedIn(false)
						})
						.catch((error) => {
							console.log(error)
						})
				}}
			>
				Logout
			</Button>
		</>
	)
}
