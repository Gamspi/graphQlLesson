const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [
	{id: 1, username: 'leo', age: 23},
	{id: 2, username: 'Nikolay', age: 23},
	{id: 3, username: 'Anna', age: 23},
]
const PORT = 5000
const app = express()
const createUser = (input) => {
	const id = Date.now()
	return {
		id, ...input
	}
}

app.use(cors())
const root = {
	getAllUsers: () => {
		return users
	},
	getUser: ({id}) => {
		return users.find(user => user.id === +id)
	},
	createUser: ({input}) => {
		const user = createUser(input)
		users.push(user)
		return user
	}
}
app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
	rootValue: root
}))

app.listen(PORT, () => console.log('server started =)'))
