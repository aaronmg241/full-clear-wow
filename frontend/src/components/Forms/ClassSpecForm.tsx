import { forwardRef, useState } from 'react'
import { Flex, Select, Text } from '@mantine/core'

import { classes } from '../../types/data/Classes'

type Props = {
	form: any
	initialClass?: string
}

const classData = Object.keys(classes).map((key) => {
	return { value: key, label: classes[key].readableName, color: classes[key].color }
})

export default function ClassSpecForm({ form, initialClass }: Props) {
	const [specOptions, setSpecOptions] = useState(
		Object.keys(classes[initialClass ? initialClass : 'death_knight'].specs).map((key) => ({
			value: key,
			label: classes[initialClass ? initialClass : 'death_knight'].specs[key].readableName,
		})) as { value: string; label: string }[]
	)

	return (
		<Flex gap='1rem' mt='1rem'>
			<Select
				withinPortal
				label='Class'
				searchable
				data={classData}
				itemComponent={SelectItem}
				{...form.getInputProps('characterClass')}
				onChange={(selectedClass: string) => {
					const options = Object.keys(classes[selectedClass].specs).map((key) => ({
						value: key,
						label: classes[selectedClass].specs[key].readableName,
					}))
					setSpecOptions(options)
					form.setFieldValue('characterClass', selectedClass)
					form.setFieldValue('spec', options[0].value)
				}}
				styles={() => ({
					input: {
						// applies styles to selected item
						color: classes[form.values.characterClass].color,
					},
				})}
			/>
			<Select label='Spec' searchable withinPortal data={specOptions} {...form.getInputProps('spec')} />
		</Flex>
	)
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
	color: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, color, ...others }: ItemProps, ref) => (
	<div ref={ref} {...others}>
		<Text size='sm' color={color}>
			{label}
		</Text>
	</div>
))
