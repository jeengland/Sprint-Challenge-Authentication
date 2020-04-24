import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [state, setState] = useState({ username: '', password: '' });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3300/api/login', state)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setState({ username: '', password: '' });
                history.push('/users');
            })
            .catch((error) => {
                console.error(error);
                setState({ username: '', password: '' });
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' value={state.username} onChange={handleChange}/>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' value={state.password} onChange={handleChange}/>
                <input type='submit' />
            </form>
            <Link to='/signup'>Create an account</Link>
        </>
    )
}

export default Login;