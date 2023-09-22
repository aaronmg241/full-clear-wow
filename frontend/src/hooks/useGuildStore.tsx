import { createWithEqualityFn } from 'zustand/traditional'

interface Store {
	currGuild: Guild | null
	setCurrGuild: (guild: Guild | null) => void
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (character: Character) => void
}

export const useGuildStore = createWithEqualityFn<Store>()(
	(set) => ({
		currGuild: null,
		setCurrGuild: (guild: Guild | null) => set({ currGuild: guild }),
		guildRoster: [],
		setGuildRoster: (roster: Character[]) => set({ guildRoster: roster }),
		addCharacterToRoster: (character: Character) => set((state) => ({ guildRoster: [...state.guildRoster, character] })),
		removeCharacterFromRoster: (character: Character) =>
			set((state) => ({ guildRoster: state.guildRoster.filter((c) => c.id !== character.id) })),
	}),
	Object.is
)
