import React from 'react'
import "../../style/Forms.css"
export default function Login() {
  return (
    <div className='LoginPage'>
      <h3>Login</h3>
      <form action="/login" method="POST">
        <label htmlFor='email'>email</label>
        <input type="email" name="email"></input>
        <label htmlFor='password'>password</label>
        <input type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
