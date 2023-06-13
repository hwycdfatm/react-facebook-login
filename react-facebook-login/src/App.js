import FacebookLogin from 'react-facebook-login'

import './App.css'
import { useState } from 'react'
const iconFacebook = (
	<svg viewBox="0 0 24 24" fill="currentColor" height="2em" width="2em">
		<path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
	</svg>
)

function App() {
	const [user, setUser] = useState({})
	const handleLogin = async (data) => {
		try {
			const response = await fetch('http://localhost:5000/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const result = await response.json()
			setUser(result.user)
		} catch (error) {
			console.log(error)
		}
	}

	console.log(user)
	return (
		<div className="wrapper">
			<div className="container">
				{user.name ? (
					<>
						<img src={user.picture} alt={user.name} />
						<div>
							<p>{user.name}</p>
							<p>{user.email}</p>
						</div>
					</>
				) : (
					<>
						<h1>Login With Facebook</h1>
						<FacebookLogin
							appId="your-app-id"
							fields="name,email"
							cssClass="button-facebook"
							typeButton="button"
							disableMobileRedirect={true}
							// Hàm callback trả về dữ liệu
							callback={(data) => handleLogin(data)}
							// Thêm text vào cho button
							textButton={
								<span className="button-facebook-text">Facebook</span>
							}
							// Thêm icon vào cho button
							icon={iconFacebook}
						/>
					</>
				)}
			</div>
		</div>
	)
}

export default App
