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

	clearStore: () => void
}

const initialState = {
	selectedRow: 0,
	guilds: [],
	currBoss: bosses[0],
	guildRoster: [],
	bossRoster: [],
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

		clearStore: () => set(initialState),
	}),
	Object.is
)
