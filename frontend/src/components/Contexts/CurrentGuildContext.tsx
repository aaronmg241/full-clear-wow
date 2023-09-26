import React, { createContext } from 'react'

import { useLocation, useParams, generatePath, useNavigate } from 'react-router-dom'
import { useGuildStore } from '../../hooks/useGuildStore'

// Define the types for the context
interface CurrentGuildContextType {
	currGuild: Guild | null
	setCurrGuild: (newGuildId: string) => void
}

// Create an CurrentGuildContext
export const CurrentGuildContext = createContext<CurrentGuildContextType>({
	currGuild: null,
	setCurrGuild: () => {},
})

export default function CurrentGuildContextProvider({ children }: { children: React.ReactNode }) {
	const { guildId } = useParams()
	const guilds = useGuildStore((state) => state.guilds)

	const location = useLocation()
	const navigate = useNavigate()

	// The current guild is derived from the guildId in the URL
	// If there is no guildId in the URL, then we default to the first guild in the list
	const currGuild = guilds.find((guild) => guild.id == guildId) || guilds[0] || null

	function setCurrGuild(newGuildId: string) {
		if (guildId === newGuildId) return

		if (!guildId) {
			navigate(generatePath('/:guildId' + location.pathname, { guildId: newGuildId }))
			return
		}

		navigate(generatePath(location.pathname.replace(guildId, newGuildId), { guildId: newGuildId }))
	}

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: CurrentGuildContextType = {
		currGuild,
		setCurrGuild,
	}

	return <CurrentGuildContext.Provider value={contextValue}>{children}</CurrentGuildContext.Provider>
}
