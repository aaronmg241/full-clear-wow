import { Global } from '@mantine/core'

export default function GlobalStyles() {
	return (
		<Global
			styles={(theme) => ({
				'*, *::before, *::after': { boxSizing: 'border-box' },

				body: {
					'--danger-red': theme.colors.red[6],
					'--success-green': theme.colors.green[6],
					'--hover-bg': '#BAC8FF22',
				},
				'.mantine-Menu-dropdown': {
					padding: '0.5rem',
					border: 'none',
				},

				'.mantine-Skeleton-root::after, .mantine-Skeleton-root::after': {
					background: theme.colors.gray[9],
				},

				'.mantine-Select-item[data-selected]:hover, .mantine-Select-item[data-selected]': {
					background: theme.colors.gray[8],
				},
			})}
		/>
	)
}
