import { createWithEqualityFn } from 'zustand/traditional'
import { bosses } from '../types/data/Raid'

interface Store {
	selectedRow: number
	setSelectedRow: (row: number) => void

	guilds: Guild[]
	setGuilds: (guilds: Guild[]) => void
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (id: string) => void
	currBoss: Boss
	setCurrBoss: (boss: Boss) => void

	bossRoster: Character[]
	addCharacterToBossRoster: (character: Character) => void
	removeCharacterFromBossRoster: (id: string) => void
	setBossRoster: (roster: Character[]) => void

	currBossPlan: null | BossPlan
	setCurrBossPlan: (plan: BossPlan) => void

	addCooldownToBossPlan: (rowNumber: number, columnNumber: number, character: Character, ability: Ability) => void
	removeCooldownFromBossPlan: (rowNumber: number, columnNumber: number) => void

	clearStore: () => void
}

const initialState = {
	selectedRow: 0,
	guilds: [],
	currBoss: bosses[0],
	guildRoster: [],
	bossRoster: [],
	currBossPlan: null,
}

export const useGuildStore = createWithEqualityFn<Store>()(
	(set) => ({
		...initialState,

		setSelectedRow: (row: number) => set({ selectedRow: row }),

		setGuilds: (guilds: Guild[]) => set({ guilds: guilds }),
		setGuildRoster: (roster: Character[]) => set({ guildRoster: roster }),
		addCharacterToRoster: (character: Character) =>
			set((state) => ({ guildRoster: [...state.guildRoster.filter((c) => c.id !== character.id), character] })),
		removeCharacterFromRoster: (id: string) => set((state) => ({ guildRoster: state.guildRoster.filter((c) => c.id !== id) })),
		setCurrBoss: (boss: Boss) => set({ currBoss: boss }),

		addCharacterToBossRoster: (character: Character) =>
			set((state) => ({ bossRoster: [...state.bossRoster.filter((c) => c.id !== character.id), character] })),
		removeCharacterFromBossRoster: (id: string) => set((state) => ({ bossRoster: state.bossRoster.filter((c) => c.id !== id) })),
		setBossRoster: (roster: Character[]) => set({ bossRoster: roster }),

		setCurrBossPlan: (plan: BossPlan) => set({ currBossPlan: plan }),
		addCooldownToBossPlan: (rowNumber: number, columnNumber: number, character: Character, ability: Ability) => {
			const newBossPlan = { ...useGuildStore.getState().currBossPlan } as BossPlan

			console.log({ rowNumber, columnNumber, character, ability })
			if (!newBossPlan || !newBossPlan.rows) return

			const row = newBossPlan.rows[rowNumber]

			if (!row) return

			console.log('here')

			row.assignedCooldowns = row.assignedCooldowns.filter((cooldown) => cooldown.column !== columnNumber)
			row.assignedCooldowns.push({ column: columnNumber, character, ability })

			set({ currBossPlan: newBossPlan })
		},
		removeCooldownFromBossPlan: (rowNumber: number, columnNumber: number) => {
			const newBossPlan = { ...useGuildStore.getState().currBossPlan } as BossPlan

			if (!newBossPlan || !newBossPlan.rows) return

			const row = newBossPlan.rows[rowNumber]

			if (!row) return

			row.assignedCooldowns = row.assignedCooldowns.filter((cooldown) => cooldown.column !== columnNumber)
			set({ currBossPlan: newBossPlan })
		},

		clearStore: () => set(initialState),
	}),
	Object.is
)
