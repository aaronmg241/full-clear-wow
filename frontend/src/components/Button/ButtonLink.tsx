import { UnstyledButton, createStyles, createPolymorphicComponent } from '@mantine/core'
import { forwardRef } from 'react'

interface ButtonProps {
	children: React.ReactNode
}

const useStyles = createStyles((theme) => ({
	registerLink: {
		color: theme.colors.indigo[5],
		fontWeight: 700,

		':hover': {
			textDecoration: 'underline',
		},
	},
}))

const _ButtonLink = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...others }, ref) => {
	const { classes } = useStyles()
	return (
		<UnstyledButton className={classes.registerLink} ref={ref} fz={14} {...others}>
			{children}
		</UnstyledButton>
	)
})

export const ButtonLink = createPolymorphicComponent<'button', ButtonProps>(_ButtonLink)
