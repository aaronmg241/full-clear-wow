import BossRosters from '../../components/Roster/BossRosters'
import GuildRoster from '../../components/Roster/GuildRoster'

type Props = {}

export default function Roster({}: Props) {
	return (
		<>
			<GuildRoster />
			<BossRosters />
		</>
	)
}
