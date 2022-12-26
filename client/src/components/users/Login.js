import React from 'react'
import "../../style/Forms.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api/Api.js';

export default function Login() {
  const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()


		try {
			const response = await Api.post('/users/login', {
				email,
				password,
			});
			const data = response.data;
			if (data) {
				navigate('/');
			}
		} catch (error) {
			console.error(error);
		}
	}
  return (
    <div className='LoginPage'>

      
      <h3>Login</h3>
      <form onSubmit={loginUser}>
      <label htmlFor='email'>email</label>
					<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
					<label htmlFor='password'>password</label>
					<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
