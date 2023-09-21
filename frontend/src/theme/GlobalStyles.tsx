import { Global } from '@mantine/core'

export default function GlobalStyles() {
	return (
		<Global
			styles={(theme) => ({
				'*, *::before, *::after': { boxSizing: 'border-box' },

				body: {
					'--danger-red': theme.colors.red[6],
					'--hover-bg': '#BAC8FF22',
				},
				'.mantine-Menu-dropdown': {
					padding: '0.5rem',
					border: 'none',
				},
			})}
		/>
	)
}