import React from 'react'
import "../../style/Forms.css"

export default function Register() {

  return(
  <div className='Register'>
  <h3>Register</h3>
  <form action="http://localhost:5000/api/register" method="POST">
    <label htmlFor='email'>email</label>
    <input type="email" name="email"></input>
    <label htmlFor='password'>password</label>
    <input type="password" name="password"></input>
    <button type="submit">Register</button>
  </form>
</div>
)
}
