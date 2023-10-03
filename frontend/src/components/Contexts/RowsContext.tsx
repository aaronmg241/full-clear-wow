import React, { createContext, useState, useEffect } from 'react'

import { useGuildStore } from '../../hooks/useGuildStore'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'
import { notifications } from '@mantine/notifications'

// Define the types for the context
interface RowsContextType {
	rows: BossPlanRow[]
	setRows: (newRows: BossPlanRow[]) => void
	addCooldownToRow: (
		rowNumber: number,
		columnNumber: number,
		characterId: string,
		spellId: number | null,
		customInstruction?: string
	) => void
	removeCooldownFromRow: (rowNumber: number, columnNumber: number) => void
}

// Create a RowsContext
export const RowsContext = createContext<RowsContextType>({
	rows: [],
	setRows: () => {},
	addCooldownToRow: () => {},
	removeCooldownFromRow: () => {},
})

export default function RowsContextProvider({ children }: { children: React.ReactNode }) {
	const [rows, setRows] = useState<BossPlanRow[]>([])
	const jwtAxios = useAxiosWithInterceptor()
	const currBossPlan = useGuildStore((state) => state.currBossPlan)
	const setBossRoster = useGuildStore((state) => state.setBossRoster)

	useEffect(() => {
		if (!currBossPlan) return
		jwtAxios
			.get(`/guilds/${currBossPlan.guild}/plans/${currBossPlan.id}/`)
			.then((response) => {
				setBossRoster(response.data.roster)
				setRows(response.data.rows)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [currBossPlan])

	function addCooldownToRow(
		rowNumber: number,
		columnNumber: number,
		characterId: string,
		spellId: number | null,
		customInstruction?: string
	) {
		const newRows = [...rows]

		const row = newRows[rowNumber]

		if (!row) return

		row.assignedCooldowns = row.assignedCooldowns.filter((cooldown) => cooldown.column !== columnNumber)

		let data

		if (spellId) {
			data = {
				character: characterId,
				spellId,
				column: columnNumber,
			}
			row.assignedCooldowns.push({ column: columnNumber, character: characterId, spellId })
		} else if (characterId === 'everyone') {
			data = {
				customInstruction,
				column: columnNumber,
				forEveryone: true,
			}
			row.assignedCooldowns.push({ column: columnNumber, forEveryone: true, customInstruction })
		} else {
			data = {
				character: characterId,
				customInstruction,
				column: columnNumber,
			}
			row.assignedCooldowns.push({ column: columnNumber, character: characterId, customInstruction })
		}

		jwtAxios.post(`/guilds/${currBossPlan?.guild}/rows/${row.id}/cooldowns/`, data).catch((error) => {
			console.log(error)
			notifications.show({
				title: 'Error',
				message: 'There was an error assigning the cooldown',
				color: 'red',
				autoClose: 5000,
			})
		})

		setRows(newRows)
	}

	function removeCooldownFromRow(rowNumber: number, columnNumber: number) {
		const newRows = [...rows]

		const row = newRows[rowNumber]

		if (!row) return

		row.assignedCooldowns = row.assignedCooldowns.filter((cooldown) => cooldown.column !== columnNumber)

		jwtAxios.delete(`/guilds/${currBossPlan?.guild}/rows/${row.id}/cooldowns/`, { data: { column: columnNumber } }).catch((error) => {
			console.log(error)
			notifications.show({
				title: 'Error',
				message: 'There was an error removing the cooldown.',
				color: 'red',
				autoClose: 5000,
			})
		})

		setRows(newRows)
	}

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: RowsContextType = {
		rows,
		setRows,
		addCooldownToRow,
		removeCooldownFromRow,
	}

	return <RowsContext.Provider value={contextValue}>{children}</RowsContext.Provider>
}
