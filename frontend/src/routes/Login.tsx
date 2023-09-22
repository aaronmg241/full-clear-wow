import '../App.css'

import { motion } from 'framer-motion'
import AccountFormContainer from '../components/Containers/PageFormContainer'
import { Outlet } from 'react-router-dom'

function Login() {
	return (
		<AccountFormContainer>
			<motion.div initial={{ opacity: 0.5, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'tween', duration: 0.4 }}>
				<Outlet />
			</motion.div>
		</AccountFormContainer>
	)
}

export default Login
