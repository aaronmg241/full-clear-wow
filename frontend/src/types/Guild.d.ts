type Guild = {
	readonly id: string
	name: string
}

type Character = {
	readonly id: string
	name: string
	characterClass: string
	spec: string
	role: string
}

type Class = {
	readonly color: string
	readonly readableName: string
	readonly defaultSpec: string
	readonly importantAbilities: Ability[]
	readonly specs: {
		[key: string]: Spec
	}
}

type Boss = {
	readonly id: number
	readonly name: string
	readonly iconPath?: string
}

type Spec = {
	readonly readableName: string
	readonly role: string
	readonly importantAbilities: Ability[]
}

type Ability = {
	readonly spellName: string
	readonly readableName: string
	readonly cooldown: number
	readonly spellID: number
}

type AbilityUse = {
	readonly player: Character
	readonly ability: Ability
}

type BossPlan = {
	rows: BossPlanRow[]
}

type BossPlanRow = {
	spellName: string
	time: number
	id: string
	assignedCooldowns: AssignedCooldown[]
}

type AssignedCooldown = {
	column: number
	character: Character
	ability: Ability
}

type EventType = 'SCC' | 'SCS' | 'SAR' | 'SAA'
