export const classes: { [key: string]: Class } = {
	death_knight: {
		color: '#c41e3a',
		defaultSpec: 'unholy',
		readableName: 'Death Knight',
		importantAbilities: [
			{
				spellName: 'anti-magic-zone',
				readableName: 'Anti Magic Zone',
				cooldown: 120,
				spellID: 51052,
			},
		],
		specs: {
			blood: {
				readableName: 'Blood',
				role: 'tank',
				importantAbilities: [],
			},
			frost: {
				readableName: 'Frost',
				role: 'melee',
				importantAbilities: [],
			},
			unholy: {
				readableName: 'Unholy',
				role: 'melee',
				importantAbilities: [],
			},
		},
	},
	demon_hunter: {
		color: '#a330c9',
		readableName: 'Demon Hunter',
		defaultSpec: 'havoc',
		importantAbilities: [
			{
				spellName: 'darkness',
				readableName: 'Darkness',
				cooldown: 300,
				spellID: 196718,
			},
		],
		specs: {
			havoc: {
				readableName: 'Havoc',
				role: 'melee',
				importantAbilities: [],
			},
			vengeance: {
				readableName: 'Vengeance',
				role: 'tank',
				importantAbilities: [],
			},
		},
	},
	druid: {
		color: '#ff7c0a',
		importantAbilities: [],
		readableName: 'Druid',
		defaultSpec: 'balance',
		specs: {
			balance: {
				readableName: 'Balance',
				role: 'ranged',
				importantAbilities: [],
			},
			feral: {
				readableName: 'Feral',
				role: 'melee',
				importantAbilities: [],
			},
			guardian: {
				readableName: 'Guardian',
				role: 'tank',
				importantAbilities: [],
			},
			restoration: {
				readableName: 'Restoration',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'flourish',
						readableName: 'Flourish',
						cooldown: 180,
						spellID: 197721,
					},
					{
						spellName: 'convoke-the-spirits',
						readableName: 'Convoke',
						cooldown: 180,
						spellID: 323764,
					},
					{
						spellName: 'stampeding-roar',
						readableName: 'Stampeding Roar',
						cooldown: 180,
						spellID: 77761,
					},
					{
						spellName: 'tranquility',
						readableName: 'Tranquility',
						cooldown: 180,
						spellID: 740,
					},
				],
			},
		},
	},
	evoker: {
		color: '#33937f',
		defaultSpec: 'preservation',
		readableName: 'Evoker',
		importantAbilities: [],
		specs: {
			preservation: {
				readableName: 'Preservation',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'blessing-of-the-bronze',
						readableName: 'Blessing of the Bronze',
						cooldown: 180,
						spellID: 381748,
					},
					{
						spellName: 'dream-flight',
						readableName: 'Dream Flight',
						cooldown: 180,
						spellID: 362361,
					},
					{
						spellName: 'emerald-communion',
						readableName: 'Emerald Communion',
						cooldown: 180,
						spellID: 370984,
					},
					{
						spellName: 'rewind',
						readableName: 'Rewind',
						cooldown: 180,
						spellID: 363534,
					},
					{
						spellName: 'stasis',
						readableName: 'Stasis',
						cooldown: 180,
						spellID: 370537,
					},
					{
						spellName: 'time-spiral',
						readableName: 'Time Spiral',
						cooldown: 180,
						spellID: 374968,
					},
				],
			},
			devastation: {
				readableName: 'Devastation',
				role: 'ranged',
				importantAbilities: [],
			},
		},
	},
	hunter: {
		color: '#aad372',
		importantAbilities: [],
		readableName: 'Hunter',
		defaultSpec: 'beast_mastery',
		specs: {
			beast_mastery: {
				readableName: 'Beast Mastery',
				role: 'ranged',
				importantAbilities: [],
			},
			marksmanship: {
				readableName: 'Marksmanship',
				role: 'ranged',
				importantAbilities: [],
			},
			survival: {
				readableName: 'Survival',
				role: 'melee',
				importantAbilities: [],
			},
		},
	},
	mage: {
		color: '#3fc7eb',
		readableName: 'Mage',
		importantAbilities: [],
		defaultSpec: 'fire',
		specs: {
			arcane: {
				readableName: 'Arcane',
				role: 'ranged',
				importantAbilities: [],
			},
			fire: {
				readableName: 'Fire',
				role: 'ranged',
				importantAbilities: [],
			},
			frost: {
				readableName: 'Frost',
				role: 'ranged',
				importantAbilities: [],
			},
		},
	},
	monk: {
		color: '#00ff98',
		readableName: 'Monk',
		importantAbilities: [],
		defaultSpec: 'windwalker',
		specs: {
			brewmaster: {
				readableName: 'Brewmaster',
				role: 'tank',
				importantAbilities: [],
			},
			mistweaver: {
				readableName: 'Mistweaver',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'cocoon',
						readableName: 'Life Cocoon',
						cooldown: 180,
						spellID: 116849,
					},
					{
						spellName: "invoke-y'ulon-the-jade-serpent",
						readableName: "Y'ulon",
						cooldown: 180,
						spellID: 323664,
					},
					{
						spellName: 'revival',
						readableName: 'Revival',
						cooldown: 180,
						spellID: 115310,
					},
				],
			},
			windwalker: {
				readableName: 'Windwalker',
				role: 'melee',
				importantAbilities: [],
			},
		},
	},
	paladin: {
		color: '#f48cba',
		readableName: 'Paladin',
		importantAbilities: [],
		defaultSpec: 'retribution',
		specs: {
			holy: {
				readableName: 'holy',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'aura-mastery',
						readableName: 'Aura Mastery',
						cooldown: 180,
						spellID: 135872,
					},
					{
						spellName: 'avenging-wrath',
						readableName: 'Avenging Wrath',
						cooldown: 120,
						spellID: 135875,
					},
					{
						spellName: 'blessing-of-sacrifice',
						readableName: 'Blessing of Sacrifice',
						cooldown: 120,
						spellID: 135966,
					},
					{
						spellName: 'blessing-of-protection',
						readableName: 'Blessing of Protection',
						cooldown: 300,
						spellID: 135964,
					},
					{
						spellName: 'blessing-of-spellwarding',
						readableName: 'Blessing of Spellwarding',
						cooldown: 300,
						spellID: 135880,
					},
				],
			},
			protection: {
				readableName: 'protection',
				role: 'tank',
				importantAbilities: [],
			},
			retribution: {
				readableName: 'retribution',
				role: 'melee',
				importantAbilities: [],
			},
		},
	},
	priest: {
		color: '#ffffff',
		readableName: 'Priest',
		importantAbilities: [],
		defaultSpec: 'holy',
		specs: {
			discipline: {
				readableName: 'Discipline',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'evangelism',
						readableName: 'Evangelism',
						cooldown: 90,
						spellID: 135895,
					},
					{
						spellName: 'power-word-barrier',
						readableName: 'Power Word: Barrier',
						cooldown: 180,
						spellID: 253400,
					},
					{
						spellName: 'rapture',
						readableName: 'Rapture',
						cooldown: 90,
						spellID: 237548,
					},
					{
						spellName: 'pain-suppression',
						readableName: 'Pain Suppression',
						cooldown: 180,
						spellID: 135936,
					},
				],
			},
			holy: {
				role: 'healer',
				readableName: 'Holy',
				importantAbilities: [
					{
						spellName: 'holy-word-salvation',
						readableName: 'Holy Word: Salvation',
						cooldown: 240,
						spellID: 265202,
					},
					{
						spellName: 'divine-hymn',
						readableName: 'Divine Hymn',
						cooldown: 180,
						spellID: 237540,
					},
					{
						spellName: 'guardian-spirit',
						readableName: 'Guardian Spirit',
						cooldown: 180,
						spellID: 237542,
					},
				],
			},
			shadow: {
				readableName: 'Shadow',
				role: 'ranged',
				importantAbilities: [],
			},
		},
	},
	rogue: {
		color: '#fff468',
		readableName: 'Rogue',
		importantAbilities: [],
		defaultSpec: 'subtlety',
		specs: {
			assassination: {
				readableName: 'assassination',
				role: 'melee',
				importantAbilities: [],
			},
			outlaw: {
				readableName: 'outlaw',
				role: 'melee',
				importantAbilities: [],
			},
			subtlety: {
				readableName: 'subtlety',
				role: 'melee',
				importantAbilities: [],
			},
		},
	},
	shaman: {
		color: '#0070dd',
		readableName: 'Shaman',
		importantAbilities: [],
		defaultSpec: 'enhancement',
		specs: {
			restoration: {
				readableName: 'restoration',
				role: 'healer',
				importantAbilities: [
					{
						spellName: 'spirit-link',
						readableName: 'Spirit Link Totem',
						cooldown: 180,
						spellID: 98008,
					},
					{
						spellName: 'healing-tide-totem',
						readableName: 'Healing Tide Totem',
						cooldown: 180,
						spellID: 108280,
					},
					{
						spellName: 'ascendance',
						readableName: 'Ascendance',
						cooldown: 180,
						spellID: 114052,
					},
				],
			},
			enhancement: {
				readableName: 'enhancement',
				role: 'melee',
				importantAbilities: [],
			},
			elemental: {
				readableName: 'elemental',
				role: 'ranged',
				importantAbilities: [],
			},
		},
	},
	warlock: {
		color: '#8788ee',
		readableName: 'Warlock',
		importantAbilities: [],
		defaultSpec: 'demonology',
		specs: {
			affliction: {
				readableName: 'Affliction',
				role: 'ranged',
				importantAbilities: [],
			},
			demonology: {
				readableName: 'Demonology',
				role: 'ranged',
				importantAbilities: [],
			},
			destruction: {
				readableName: 'Destruction',
				role: 'ranged',
				importantAbilities: [],
			},
		},
	},
	warrior: {
		color: '#c69b6d',
		readableName: 'Warrior',
		defaultSpec: 'arms',
		importantAbilities: [
			{
				spellName: 'rallying-cry',
				readableName: 'Rallying Cry',
				cooldown: 180,
				spellID: 97462,
			},
		],
		specs: {
			arms: {
				readableName: 'Arms',
				role: 'melee',
				importantAbilities: [],
			},
			fury: {
				readableName: 'Fury',
				role: 'melee',
				importantAbilities: [],
			},
			protection: {
				readableName: 'Protection',
				role: 'tank',
				importantAbilities: [],
			},
		},
	},
}

function getAllImportantAbilities(): Ability[] {
	const abilities: Ability[] = []

	for (const className in classes) {
		const classData = classes[className]
		abilities.push(...classData.importantAbilities)

		for (const specName in classData.specs) {
			const specData = classData.specs[specName]
			abilities.push(...specData.importantAbilities)
		}
	}

	return abilities
}

export const allImportantAbilities = getAllImportantAbilities()
