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

export function sortRoster(guildRoster: Character[]) {
	// Define a custom sorting function
	function customSort(a: Character, b: Character) {
		// Compare by class
		const classComparison = a.characterClass.localeCompare(b.characterClass)

		// If classes are the same, compare by spec
		if (classComparison === 0) {
			const specComparison = a.spec.localeCompare(b.spec)

			// If specs are the same, compare by name
			if (specComparison === 0) {
				return a.name.localeCompare(b.name)
			}

			return specComparison
		}

		return classComparison
	}

	// Sort the guildRoster array using the custom sorting function
	return guildRoster.sort(customSort)
}
