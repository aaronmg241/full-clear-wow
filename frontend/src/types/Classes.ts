export const classes: { [key: string]: Class } = {
	death_knight: {
		color: '#c41e3a',
		defaultSpec: 'unholy',
		readableName: 'Death Knight',
		importantAbilities: [
			{
				name: 'anti-magic-zone',
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
				name: 'darkness',
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
						name: 'flourish',
						cooldown: 180,
						spellID: 197721,
					},
					{
						name: 'convoke-the-spirits',
						cooldown: 180,
						spellID: 323764,
					},
					{
						name: 'stampeding-roar',
						cooldown: 180,
						spellID: 77761,
					},
					{
						name: 'tranquility',
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
						name: 'blessing-of-the-bronze',
						cooldown: 180,
						spellID: 381748,
					},
					{
						name: 'dream-flight',
						cooldown: 180,
						spellID: 362361,
					},
					{
						name: 'emerald-communion',
						cooldown: 180,
						spellID: 370984,
					},
					{
						name: 'rewind',
						cooldown: 180,
						spellID: 363534,
					},
					{
						name: 'stasis',
						cooldown: 180,
						spellID: 370537,
					},
					{
						name: 'time-spiral',
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
						name: 'cocoon',
						cooldown: 180,
						spellID: 116849,
					},
					{
						name: "invoke-y'ulon-the-jade-serpent",
						cooldown: 180,
						spellID: 323664,
					},
					{
						name: 'revival',
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
						name: 'aura-mastery',
						cooldown: 180,
						spellID: 135872,
					},
					{
						name: 'avenging-wrath',
						cooldown: 120,
						spellID: 135875,
					},
					{
						name: 'blessing-of-sacrifice',
						cooldown: 120,
						spellID: 135966,
					},
					{
						name: 'blessing-of-protection',
						cooldown: 300,
						spellID: 135964,
					},
					{
						name: 'blessing-of-spellwarding',
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
						name: 'evangelism',
						cooldown: 90,
						spellID: 135895,
					},
					{
						name: 'power-word-barrier',
						cooldown: 180,
						spellID: 253400,
					},
					{
						name: 'rapture',
						cooldown: 90,
						spellID: 237548,
					},
					{
						name: 'pain-suppression',
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
						name: 'holy-word-salvation',
						cooldown: 240,
						spellID: 265202,
					},
					{
						name: 'divine-hymn',
						cooldown: 180,
						spellID: 237540,
					},
					{
						name: 'guardian-spirit',
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
						name: 'spirit-link',
						cooldown: 180,
						spellID: 98008,
					},
					{
						name: 'healing-tide-totem',
						cooldown: 180,
						spellID: 108280,
					},
					{
						name: 'ascendance',
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
				name: 'rallying-cry',
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
