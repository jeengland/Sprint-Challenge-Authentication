import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import axiosWithAuth from '../utils/axiosWithAuth';

const Jokes = () => {
    const history = useHistory();
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get('http://localhost:3300/api/jokes')
            .then((response) => setJokes(response.data.jokes))
            .catch((error) => console.error(error))
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/signin');
    }
    return (
        <div>
            <div onClick={handleLogout}>Logout</div>
            {jokes && jokes.map((joke) => {
                return (
                    <div key={joke.id}>
                        <p>{joke.joke}</p>
                    </div>
                )
            })}
        </div>
    )
}