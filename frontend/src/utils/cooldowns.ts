import { allImportantAbilities } from '../types/data/Classes'

export function secondsToMMSS(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60

	const mm = String(minutes).padStart(2, '0')
	const ss = String(remainingSeconds).padStart(2, '0')

	return `${mm}:${ss}`
}

export function findRemainingCooldown(rows: BossPlanRow[], rowIndex: number, character: Character, ability: Ability): number {
	for (let index = 0; index <= rowIndex; index++) {
		for (const cooldown of rows[index].assignedCooldowns) {
			if (cooldown.spellId === ability.spellID && cooldown.character === character.id) {
				const ability = allImportantAbilities.find((ability) => ability.spellID === cooldown.spellId)

				if (!ability) return 0

				return Math.max(0, ability.cooldown - (rows[rowIndex].time - rows[index].time))
			}
		}
	}

	return 0
}

export function findCooldown(row: BossPlanRow, column: number) {
	for (const ability of row.assignedCooldowns) {
		if (column === ability.column) {
			return ability
		}
	}

	return null
}
