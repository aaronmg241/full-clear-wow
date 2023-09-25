import React, { createContext, useContext } from 'react'
import { useGuildStore } from '../../hooks/useGuildStore'

import useWebSocket from 'react-use-websocket'
import { CurrentGuildContext } from './CurrentGuildContext'

type RosterUpdate = {
	name?: string
	characterClass?: string
	spec?: string
	role?: string
	id: string
	shouldDelete?: boolean
}

// Define the types for the context
interface RosterContextType {
	sendRosterUpdate: (rosterUpdate: RosterUpdate) => void
}

// Create an RosterContext
export const RosterContext = createContext<RosterContextType>({
	sendRosterUpdate: () => {},
})

export default function RosterContextProvider({ children }: { children: React.ReactNode }) {
	const { currGuild } = useContext(CurrentGuildContext)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const removeCharacterFromRoster = useGuildStore((state) => state.removeCharacterFromRoster)

	// wss://wordle-with-friends-backend-production.up.railway.app/
	const socketUrl = currGuild ? `${import.meta.env.VITE_WEBSOCKET_URL}/ws/guilds/${currGuild.id}/roster/` : ''

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onOpen: () => console.log('opened'),
		onClose: () => console.log('closed'),
		onError: (e) => console.log('websocket error', e),
		onMessage: (e) => {
			const data = JSON.parse(e.data)

			if (data.shouldDelete) {
				removeCharacterFromRoster(data.id)
				return
			}

			addCharacterToRoster(data)
		},
	})

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: RosterContextType = {
		sendRosterUpdate: sendJsonMessage,
	}

	return <RosterContext.Provider value={contextValue}>{children}</RosterContext.Provider>
}
