import axios from 'axios'

export default async function getUser() {
	axios.get('/guilds/user/', { withCredentials: true }).then((res) => {
		return res.data
	})
}
