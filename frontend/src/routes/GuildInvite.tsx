import { useState, useEffect, useRef } from 'react'
import { Flex, Loader, Text } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import { IconExclamationCircle, IconCircleCheck } from '@tabler/icons-react'

import PageFormContainer from '../components/Containers/PageFormContainer'
import useAxiosWithInterceptor from '../hooks/useAxiosWithInterceptor'
import { ButtonLink } from '../components/Buttons/ButtonLink'
import { useGuildStore } from '../hooks/useGuildStore'

type Props = {}

let requestBeingSent = false

export default function GuildInvite({}: Props) {
	const { code } = useParams()
	const navigate = useNavigate()
	const [error, setError] = useState('' as string)
	const [response, setResponse] = useState('' as string)
	const newGuildId = useRef('' as string)
	const jwtAxios = useAxiosWithInterceptor()
	const setGuilds = useGuildStore((state) => state.setGuilds)
	const guilds = useGuildStore((state) => state.guilds)

	useEffect(() => {
		async function loadData() {
			if (requestBeingSent) return

			requestBeingSent = true
			try {
				const response = await jwtAxios.post('guilds/invite/', { code })

				setResponse('You have been added to the guild!')
				setGuilds([...guilds, response.data])

				newGuildId.current = response.data.id
			} catch (error: any) {
				const message = error.response.data.detail ? error.response.data.detail : 'There was an error adding you to the guild.'
				setError(message)
			}
			requestBeingSent = false
		}

		loadData()
	}, [])

	return (
		<PageFormContainer>
			{response.length > 0 && (
				<>
					<Text align='center'>{response}</Text>
					<Flex justify='center' mt='2rem'>
						<IconCircleCheck size={60} color='var(--success-green)' />
					</Flex>
					<ButtonLink
						onClick={() => navigate(`/${newGuildId.current}`)}
						style={{ margin: '2rem auto 0 auto', display: 'block', paddingBottom: '1rem' }}
					>
						Go to home page
					</ButtonLink>
				</>
			)}
			{error.length > 0 && response.length == 0 && (
				<>
					<Text align='center'>{error}</Text>
					<Flex justify='center' mt='2rem'>
						<IconExclamationCircle size={60} color='var(--danger-red)' />
					</Flex>
					<ButtonLink
						onClick={() => navigate('/')}
						style={{ margin: '2rem auto 0 auto', display: 'block', paddingBottom: '1rem' }}
					>
						Go to home page
					</ButtonLink>
				</>
			)}
			{response.length === 0 && error.length === 0 && (
				<>
					<Text align='center'>We're loading your invite...</Text>
					<Flex justify='center' mt='2rem'>
						<Loader />
					</Flex>
				</>
			)}
		</PageFormContainer>
	)
}
