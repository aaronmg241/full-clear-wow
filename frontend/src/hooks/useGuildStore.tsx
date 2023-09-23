import { createWithEqualityFn } from 'zustand/traditional'

interface Store {
	guilds: Guild[]
	setGuilds: (guilds: Guild[]) => void
	currGuild: Guild | null
	setCurrGuild: (guild: Guild | null) => void
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (character: Character) => void

	clearStore: () => void
}

const initialState = {
	guilds: [],
	currGuild: null,
	guildRoster: [],
}

export const useGuildStore = createWithEqualityFn<Store>()(
	(set) => ({
		...initialState,
		setGuilds: (guilds: Guild[]) => set({ guilds: guilds }),
		setCurrGuild: (guild: Guild | null) => set({ currGuild: guild }),
		setGuildRoster: (roster: Character[]) => set({ guildRoster: roster }),
		addCharacterToRoster: (character: Character) => set((state) => ({ guildRoster: [...state.guildRoster, character] })),
		removeCharacterFromRoster: (character: Character) =>
			set((state) => ({ guildRoster: state.guildRoster.filter((c) => c.id !== character.id) })),
		clearStore: () => set(initialState),
	}),
	Object.is
)
