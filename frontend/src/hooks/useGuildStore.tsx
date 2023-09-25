import { createWithEqualityFn } from 'zustand/traditional'

interface Store {
	guilds: Guild[]
	setGuilds: (guilds: Guild[]) => void
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (id: string) => void

	clearStore: () => void
}

const initialState = {
	guilds: [],
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
		clearStore: () => set(initialState),
	}),
	Object.is
)
