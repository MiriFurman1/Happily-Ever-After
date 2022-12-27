import React from 'react'
import "../../style/Forms.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Api } from '../../api/Api.js';



export default function Register() {
	const navigate = useNavigate();
	const [name,setName]=useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()


		try {
			const response = await Api.post('/register', {
				name,
				email,
				password,
			});
			const data = response.data;
			const token=data.token;
			Cookies.set('jwt', token, { expires: 7, sameSite: 'strict', httpOnly: true });
			if (data) {
				
				navigate('/createnewevent');
			}
		} catch (error) {
			console.error(error);
		}
	}

		return (
			<div className='Register'>
				<h3>Register</h3>
				<form onSubmit={registerUser}>
				<label htmlFor='name'>name</label>
					<input type="string" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
					<label htmlFor='email'>email</label>
					<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
					<label htmlFor='password'>password</label>
					<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
