import React, {useEffect, useState} from "react";
import './Core.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./qvery/users";
import {CREATE_USER} from "./mutation/users";


function Core() {
    const {data, error, loading, refetch} = useQuery(GET_ALL_USERS,{pollInterval:500})
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')
    useEffect(() => {
        if (!loading) setUsers(data.getAllUsers)
    }, [data])
    const addAll=e=>{
        e.preventDefault()
        refetch()
    }
    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username,
                    age,
                }
            }
        }).then(({data})=>{
            console.log(data)
            setUsername('')
            setAge('')
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
            {users.map(user=><h3>{user.username}</h3>)}
        </div>
    );
}

export default Core;
