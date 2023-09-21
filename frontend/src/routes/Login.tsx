import '../App.css'
import { useState } from 'react'

import LoginForm from '../components/Account/LoginForm'
import RegisterForm from '../components/Account/RegisterForm'
import ResetPasswordForm from '../components/Account/ResetPasswordForm'

import { motion } from 'framer-motion'
import AccountFormContainer from '../components/Containers/AccountFormContainer'

function Login() {
	const [stage, setStage] = useState('login')

	return (
		<AccountFormContainer>
			{stage === 'login' && (
				<motion.div initial={{ opacity: 0.5, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'tween', duration: 0.4 }}>
					<LoginForm setStage={setStage} />
				</motion.div>
			)}
			{stage === 'register' && (
				<motion.div initial={{ opacity: 0.5, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'tween', duration: 0.4 }}>
					<RegisterForm setStage={setStage} />
				</motion.div>
			)}
			{stage === 'resetpassword' && (
				<motion.div initial={{ opacity: 0.5, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'tween', duration: 0.4 }}>
					<ResetPasswordForm setStage={setStage} />
				</motion.div>
			)}
		</AccountFormContainer>
	)
}

export default Login
