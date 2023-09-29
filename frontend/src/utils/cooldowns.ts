export function secondsToMMSS(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60

	const mm = String(minutes).padStart(2, '0')
	const ss = String(remainingSeconds).padStart(2, '0')

	return `${mm}:${ss}`
}

export function findRemainingCooldown(bossPlan: BossPlan, rowIndex: number, character: Character, ability: Ability): number {
	for (let index = 0; index <= rowIndex; index++) {
		for (const cooldown of bossPlan.rows[index].assignedCooldowns) {
			if (cooldown.ability.spellID === ability.spellID && cooldown.character.id === character.id) {
				return Math.max(0, cooldown.ability.cooldown - (bossPlan.rows[rowIndex].time - bossPlan.rows[index].time))
			}
		}
	}

	return 0
}
