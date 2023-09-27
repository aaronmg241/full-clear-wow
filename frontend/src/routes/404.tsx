import { Flex, Text } from '@mantine/core'
import PageFormContainer from '../components/Containers/PageFormContainer'
import { ButtonLink } from '../components/Button/ButtonLink'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function LostPage({}: Props) {
	const navigate = useNavigate()

	return (
		<Flex w='100%' align='center' h='100%' direction='column'>
			<PageFormContainer>
				<Text align='center'>We couldn't find this page!</Text>
				<ButtonLink
					style={{ margin: '2rem auto 0 auto', display: 'block' }}
					onClick={() => {
						navigate('/')
					}}
				>
					Go Home
				</ButtonLink>
			</PageFormContainer>
		</Flex>
	)
}
