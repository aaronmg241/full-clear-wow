import axios, { AxiosInstance } from 'axios'
import { useContext } from 'react'
import { LoginContext } from '../components/LoginContext'

const BASE_API_URL = import.meta.env.VITE_SERVER_URL

const useAxiosWithInterceptor = (): AxiosInstance => {
	const jwtAxios = axios.create({ baseURL: BASE_API_URL, withCredentials: true })
	const { setLoggedIn } = useContext(LoginContext)

	jwtAxios.interceptors.response.use(
		(response) => {
			return response
		},
		async (error) => {
			const originalRequest = error.config

			if (error.response?.status === 401) {
				try {
					await axios.post('/dj-rest-auth/token/refresh/', {}, { withCredentials: true })
					return jwtAxios(originalRequest)
				} catch {
					setLoggedIn(false)
				}
			}
		}
	)

	return jwtAxios
}

export default useAxiosWithInterceptor
