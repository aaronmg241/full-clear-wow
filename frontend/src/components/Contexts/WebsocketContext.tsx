import React, { createContext, useContext } from 'react'
import { useGuildStore } from '../../hooks/useGuildStore'

import useWebSocket from 'react-use-websocket'
import { CurrentGuildContext } from './CurrentGuildContext'

/*
 *	This context is used to handle sending/receiving messages from the websocket connection. These messages are then
 *	used to update the guild roster and boss rosters in the zustand store. A database operation must be performed successfully
 *	before we send a message to other clients.
 */

type RosterUpdate = {
	name?: string
	characterClass?: string
	spec?: string
	role?: string
	id: string
	shouldDelete?: boolean
}

type BossRosterUpdate = {
	characterId: string
	bossId: number
	shouldRemove?: boolean
}

// Define the types for the context
interface WebsocketContextType {
	sendRosterUpdate: (rosterUpdate: RosterUpdate) => void
	sendBossRosterUpdate: (bossRosterUpdate: BossRosterUpdate) => void
}

// Create an WebsocketContext
export const WebsocketContext = createContext<WebsocketContextType>({
	sendRosterUpdate: () => {},
	sendBossRosterUpdate: () => {},
})

export default function WebsocketContextProvider({ children }: { children: React.ReactNode }) {
	const { currGuild } = useContext(CurrentGuildContext)

	const guildRoster = useGuildStore((state) => state.guildRoster)
	const currBoss = useGuildStore((state) => state.currBoss)
	const addCharacterToRoster = useGuildStore((state) => state.addCharacterToRoster)
	const removeCharacterFromRoster = useGuildStore((state) => state.removeCharacterFromRoster)
	const removeCharacterFromBossRoster = useGuildStore((state) => state.removeCharacterFromBossRoster)
	const addCharacterToBossRoster = useGuildStore((state) => state.addCharacterToBossRoster)

	// wss://wordle-with-friends-backend-production.up.railway.app/
	const socketUrl = currGuild ? `${import.meta.env.VITE_WEBSOCKET_URL}/ws/guilds/${currGuild.id}/roster/` : ''

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onError: (e) => console.log('websocket error', e),
		onMessage: (e) => {
			const data = JSON.parse(e.data)

			if (data.type === 'roster_update') {
				handleRosterUpdate(data)
			} else if (data.type === 'boss_roster_update') {
				handleBossRosterUpdate(data)
			}
		},
	})

	const handleRosterUpdate = (rosterUpdate: RosterUpdate) => {
		if (rosterUpdate.shouldDelete) {
			removeCharacterFromRoster(rosterUpdate.id)
			removeCharacterFromBossRoster(rosterUpdate.id)
			return
		}

		addCharacterToRoster(rosterUpdate as Character)
	}
	const sendRosterUpdate = (rosterUpdate: RosterUpdate) => {
		sendJsonMessage({ ...rosterUpdate, type: 'roster_update' })
	}

	const handleBossRosterUpdate = (bossRosterUpdate: BossRosterUpdate) => {
		if (bossRosterUpdate.bossId !== currBoss.id) return

		if (bossRosterUpdate.shouldRemove) {
			removeCharacterFromBossRoster(bossRosterUpdate.characterId)
			return
		}
		const character = guildRoster.find((c) => c.id === bossRosterUpdate.characterId)
		if (!character) return
		addCharacterToBossRoster(character)
	}
	const sendBossRosterUpdate = (bossRosterUpdate: BossRosterUpdate) => {
		sendJsonMessage({ ...bossRosterUpdate, type: 'boss_roster_update' })
	}

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: WebsocketContextType = {
		sendRosterUpdate,
		sendBossRosterUpdate,
	}

	return <WebsocketContext.Provider value={contextValue}>{children}</WebsocketContext.Provider>
}
