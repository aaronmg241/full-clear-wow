import { createWithEqualityFn } from 'zustand/traditional'
import { bosses } from '../types/data/Raid'

interface Store {
	guilds: Guild[]
	setGuilds: (guilds: Guild[]) => void
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (id: string) => void
	currBoss: Boss
	setCurrBoss: (boss: Boss) => void

	clearStore: () => void
}

const initialState = {
	guilds: [],
	currBoss: bosses[0],
	guildRoster: [],
}

export const useGuildStore = createWithEqualityFn<Store>()(
	(set) => ({
		...initialState,
		setGuilds: (guilds: Guild[]) => set({ guilds: guilds }),
		setGuildRoster: (roster: Character[]) => set({ guildRoster: roster }),
		addCharacterToRoster: (character: Character) =>
			set((state) => ({ guildRoster: [...state.guildRoster.filter((c) => c.id !== character.id), character] })),
		removeCharacterFromRoster: (id: string) => set((state) => ({ guildRoster: state.guildRoster.filter((c) => c.id !== id) })),
		setCurrBoss: (boss: Boss) => set({ currBoss: boss }),
		clearStore: () => set(initialState),
	}),
	Object.is
)
