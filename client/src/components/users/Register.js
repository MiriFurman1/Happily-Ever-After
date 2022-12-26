import React from 'react'
import "../../style/Forms.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_API_URL||"http://localhost:5000/api";
console.log(apiUrl);
export default function Register() {
  const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch(`${apiUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
      console.log(data.status);
			navigate('/')
		}
	}


  return (
    <div className='Register'>
      <h3>Register</h3>
      <form onSubmit={registerUser}>
        <label htmlFor='email'>email</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label htmlFor='password'>password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
