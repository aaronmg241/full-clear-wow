export const classes: { [key: string]: Class } = {
	death_knight: {
		color: '#c41e3a',
		defaultSpec: 'Unholy',
		importantAbilities: [
			{
				name: 'anti-magic-zone',
				cooldown: 120,
				spellID: 51052,
			},
		],
		specs: {
			Blood: {
				role: 'tank',
				importantAbilities: [],
			},
			Frost: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Unholy: {
				role: 'melee dps',
				importantAbilities: [],
			},
		},
	},
	demon_hunter: {
		color: '#a330c9',
		defaultSpec: 'Havoc',
		importantAbilities: [
			{
				name: 'darkness',
				cooldown: 300,
				spellID: 196718,
			},
		],
		specs: {
			Havoc: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Vengeance: {
				role: 'tank',
				importantAbilities: [],
			},
		},
	},
	druid: {
		color: '#ff7c0a',
		importantAbilities: [],
		defaultSpec: 'Balance',
		specs: {
			Balance: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Feral: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Guardian: {
				role: 'tank',
				importantAbilities: [],
			},
			Restoration: {
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
		defaultSpec: 'Preservation',
		importantAbilities: [],
		specs: {
			Preservation: {
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
			Devastation: {
				role: 'ranged dps',
				importantAbilities: [],
			},
		},
	},
	hunter: {
		color: '#aad372',
		importantAbilities: [],
		defaultSpec: 'BeastMastery',
		specs: {
			BeastMastery: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Marksmanship: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Survival: {
				role: 'melee dps',
				importantAbilities: [],
			},
		},
	},
	mage: {
		color: '#3fc7eb',
		importantAbilities: [],
		defaultSpec: 'Fire',
		specs: {
			Arcane: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Fire: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Frost: {
				role: 'ranged dps',
				importantAbilities: [],
			},
		},
	},
	monk: {
		color: '#00ff98',
		importantAbilities: [],
		defaultSpec: 'Windwalker',
		specs: {
			Brewmaster: {
				role: 'tank',
				importantAbilities: [],
			},
			Mistweaver: {
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
			Windwalker: {
				role: 'melee dps',
				importantAbilities: [],
			},
		},
	},
	paladin: {
		color: '#f48cba',
		importantAbilities: [],
		defaultSpec: 'Retribution',
		specs: {
			Holy: {
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
			Protection: {
				role: 'tank',
				importantAbilities: [],
			},
			Retribution: {
				role: 'melee dps',
				importantAbilities: [],
			},
		},
	},
	priest: {
		color: '#ffffff',
		importantAbilities: [],
		defaultSpec: 'Holy',
		specs: {
			Discipline: {
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
			Holy: {
				role: 'healer',
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
			Shadow: {
				role: 'ranged dps',
				importantAbilities: [],
			},
		},
	},
	rogue: {
		color: '#fff468',
		importantAbilities: [],
		defaultSpec: 'Subtlety',
		specs: {
			Assassination: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Outlaw: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Subtlety: {
				role: 'melee dps',
				importantAbilities: [],
			},
		},
	},
	shaman: {
		color: '#0070dd',
		importantAbilities: [],
		defaultSpec: 'Enhancement',
		specs: {
			Restoration: {
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
			Enhancement: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Elemental: {
				role: 'ranged dps',
				importantAbilities: [],
			},
		},
	},
	warlock: {
		color: '#8788ee',
		importantAbilities: [],
		defaultSpec: 'Demonology',
		specs: {
			Affliction: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Demonology: {
				role: 'ranged dps',
				importantAbilities: [],
			},
			Destruction: {
				role: 'ranged dps',
				importantAbilities: [],
			},
		},
	},
	warrior: {
		color: '#c69b6d',
		defaultSpec: 'Arms',
		importantAbilities: [
			{
				name: 'rallying-cry',
				cooldown: 180,
				spellID: 97462,
			},
		],
		specs: {
			Arms: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Fury: {
				role: 'melee dps',
				importantAbilities: [],
			},
			Protection: {
				role: 'tank',
				importantAbilities: [],
			},
		},
	},
}
