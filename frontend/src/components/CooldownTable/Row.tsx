import { useState } from 'react'
import { Menu, Button, Text, TextInput } from '@mantine/core'

import { secondsToMMSS } from '../../utils/cooldowns'
import HealerHoverCard from './HealerHoverCard'
import CooldownSearch from './CooldownSearch'

type Props = {
	row: Row
	healers: Character[]
}

type Row = {
	customName?: string
	time: number
	spellName: string
	spellId?: number
	spellLink?: string | null
	counter?: number
	eventType?: EventType
}

export default function Row({ row, healers }: Props) {
	const [isSearching, setIsSearching] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	return (
		<tr>
			<td>{row.spellName}</td>
			<td>{secondsToMMSS(row.time)}</td>
			{Array.from({ length: 6 }).map((_, index) => (
				<td key={index}>
					<Menu shadow='md'>
						<Menu.Target>
							<Button
								w='100%'
								h='100%'
								bg='transparent'
								style={{ borderRadius: 0 }}
								styles={(theme) => ({
									root: {
										'&:not([data-disabled])': theme.fn.hover({
											background: 'var(--hover-indigo-bg)',
										}),
									},
								})}
							>
								<Text color='transparent'>hi</Text>
							</Button>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Label>Search</Menu.Label>
							<TextInput
								ml='0.75rem'
								mb='1rem'
								value={searchValue}
								onChange={(e) => {
									setSearchValue(e.target.value)
								}}
								onFocus={() => {
									setIsSearching(true)
								}}
								onBlur={() => {
									setIsSearching(false)
								}}
							/>

							{isSearching && <CooldownSearch searchValue={searchValue} />}

							{!isSearching && (
								<>
									<Menu.Label>Healers</Menu.Label>
									{healers.map((healer) => {
										return <HealerHoverCard character={healer} key={healer.id} />
									})}
								</>
							)}
						</Menu.Dropdown>
					</Menu>
				</td>
			))}
		</tr>
	)
}
