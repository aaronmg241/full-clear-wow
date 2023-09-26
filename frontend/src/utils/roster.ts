export function groupCharacters(roster: Character[]): { [key: string]: Character[] } {
	const groupedCharacters: { [key: string]: Character[] } = {
		tank: [],
		healer: [],
		melee: [],
		ranged: [],
	}

	roster.map((character: Character) => {
		groupedCharacters[character.role].push(character)
	})

	return groupedCharacters
}
