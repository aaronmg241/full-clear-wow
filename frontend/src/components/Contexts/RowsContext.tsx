import React, { createContext, useState, useEffect } from 'react'

import { useGuildStore } from '../../hooks/useGuildStore'
import useAxiosWithInterceptor from '../../hooks/useAxiosWithInterceptor'

// Define the types for the context
interface RowsContextType {
	rows: BossPlanRow[]
	setRows: (newRows: BossPlanRow[]) => void
}

// Create a RowsContext
export const RowsContext = createContext<RowsContextType>({
	rows: [],
	setRows: () => {},
})

export default function RowsContextProvider({ children }: { children: React.ReactNode }) {
	const [rows, setRows] = useState<BossPlanRow[]>([])
	const jwtAxios = useAxiosWithInterceptor()
	const currBossPlan = useGuildStore((state) => state.currBossPlan)

	useEffect(() => {
		if (!currBossPlan) return
		jwtAxios
			.get(`/guilds/${currBossPlan.guild}/plans/${currBossPlan.id}/rows/`)
			.then((response) => {
				setRows(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [currBossPlan])

	// Provide the loggedIn and loadingAccount states to the components
	const contextValue: RowsContextType = {
		rows,
		setRows,
	}

	return <RowsContext.Provider value={contextValue}>{children}</RowsContext.Provider>
}
