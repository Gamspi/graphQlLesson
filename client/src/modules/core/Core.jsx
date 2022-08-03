import React, {useEffect, useState} from "react";
import './Core.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./qvery/users";
import {CREATE_USER} from "./mutation/users";


function Core() {

	const [newUser] = useMutation(CREATE_USER)
	const [users, setUsers] = useState([])
	const [oneUser, setOneUser] = useState(null)
	const [username, setUsername] = useState('')
	const [age, setAge] = useState('')
	const [id, setId] = useState('')

	const {data, error, loading, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500})
	const {data: userData, error: userError, loading: userLoading, refetch: UserRefetch} = useQuery(GET_ONE_USER, {
		variables: {
			id
		}
	})

	useEffect(() => {
		if (!loading) setUsers(data.getAllUsers)
	}, [data])

	const getOneUser = e => {
		e.preventDefault()
		UserRefetch()
		setOneUser(userData.getUser)
	}

	const addAll = e => {
		e.preventDefault()
		refetch()
	}
	const addUser = (e) => {
		e.preventDefault()
		newUser({
			variables: {
				input: {
					username,
					age: +age,
				}
			}
		}).then(({data}) => {

			setUsername('')
			setAge('')
			refetch()
		})
	}

	if (loading) {
		return <h1>Loading...</h1>
	}
	return (
		<div className="App">
			<form onSubmit={addUser}>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
				<input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
				<button>Создать</button>
				<button onClick={addAll}>Получить</button>
			</form>
			{users.map(user => <h3 key={user.id}>{user.username}</h3>)}
			<form onSubmit={getOneUser}>
				<input type="number" value={id} onChange={e => setId(e.target.value)}/>
				<button>One User</button>
			</form>

			{oneUser && oneUser.username && <h2>{oneUser.username}</h2>}
		</div>

	);
}

export default Core;
