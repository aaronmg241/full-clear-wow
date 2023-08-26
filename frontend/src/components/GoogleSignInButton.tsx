import React, { useEffect } from 'react'
import axios from 'axios'

const GoogleSignInButton: React.FC = () => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const callbackUrl = encodeURIComponent('http://127.0.0.1:8000/accounts/google/login/callback')

	const handleGoogleSignIn = () => {
		// Redirect the user to Google Sign-In page
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callbackUrl}&prompt=consent&response_type=code&client_id=${clientId}&scope=openid%20email%20profile&access_type=offline`
	}

	// When the user returns with the code in the query string, handle it
	const handleSignInResponse = () => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get('code')
		console.log(code)

		if (code) {
			// POST the code to your Django backend
			axios
				.post('/dj-rest-auth/google/', { code })
				.then((response) => {
					// Handle successful response, e.g., store tokens, set user as authenticated, etc.
					console.log('Google Sign-In Successful:', response.data)
				})
				.catch((error) => {
					// Handle error
					console.error('Google Sign-In Error:', error)
				})
		}
	}

	useEffect(() => {
		// Check if the user is returning from the Google Sign-In page
		handleSignInResponse()
	}, [])

	return <button onClick={handleGoogleSignIn}>Sign In with Google</button>
}

export default GoogleSignInButton
