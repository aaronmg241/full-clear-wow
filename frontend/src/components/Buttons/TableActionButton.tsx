import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@mantine/core'

type Props = {
	selected: Boolean
	children: React.ReactNode
	fontWeight?: string
}

const TableActionButton = forwardRef<HTMLButtonElement, Props>(({ selected, children, fontWeight, ...others }: Props, ref) => {
	return (
		<Button
			w='100%'
			h='100%'
			bg={selected ? 'var(--hover-indigo-bg)' : 'transparent'}
			p='0 0.5rem'
			ref={ref}
			fw={fontWeight ? fontWeight : '500'}
			style={{ borderRadius: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
			styles={(theme) => ({
				root: {
					'&:not([data-disabled])': theme.fn.hover({
						background: 'var(--hover-indigo-bg)',
					}),
				},
				inner: {
					height: 'auto',
				},
			})}
			{...others}
		>
			{children}
		</Button>
	)
})

export default TableActionButton
