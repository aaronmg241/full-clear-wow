import { create } from 'zustand'

interface Store {
	guildRoster: Character[]
	setGuildRoster: (roster: Character[]) => void
	addCharacterToRoster: (character: Character) => void
	removeCharacterFromRoster: (character: Character) => void
}

export const useGuildStore = create<Store>()((set) => ({
	guildRoster: [],
	setGuildRoster: (roster: Character[]) => set({ guildRoster: roster }),
	addCharacterToRoster: (character: Character) => set((state) => ({ guildRoster: [...state.guildRoster, character] })),
	removeCharacterFromRoster: (character: Character) =>
		set((state) => ({ guildRoster: state.guildRoster.filter((c) => c.id !== character.id) })),
}))
