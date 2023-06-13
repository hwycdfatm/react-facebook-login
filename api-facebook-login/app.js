const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.post('/token', async function (req, res) {
	try {
		const { accessToken, userID } = req.body

		if (!accessToken || !userID) {
			return res.status(400).json({ message: 'Invalid request' })
		}

		const result = await fetch(
			`https://graph.facebook.com/v11.0/${userID}?fields=name%2Cemail%2Cpicture&access_token=${accessToken}`,
			{
				method: 'GET',
			}
		)

		const data = await result.json()

		if (data.error) {
			return res.status(401).json({ message: 'Invalid token' })
		}

		const { name, email, picture } = data

		const user = {
			name,
			email,
			picture: picture.data.url,
		}

		return res.status(200).json({
			user,
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

app.listen(5000)
