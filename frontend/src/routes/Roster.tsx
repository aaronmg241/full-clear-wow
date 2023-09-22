import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../components/Account/LoginContext'
import useAxiosWithInterceptor from '../hooks/useAxiosWithInterceptor'
import CharacterDisplay from '../components/CharacterDisplay'

type Props = {}

export default function Roster({}: Props) {
	const { guilds } = useContext(LoginContext)
	const [characters, setCharacters] = useState([] as Character[])
	const jwtAxios = useAxiosWithInterceptor()

	useEffect(() => {
		jwtAxios
			.get('guilds/roster/', { params: { guild_id: guilds[0].id } })
			.then((response) => {
				setCharacters(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<div>
			{characters.map((character) => {
				return <CharacterDisplay key={character.id} character={character} />
			})}
		</div>
	)
}
