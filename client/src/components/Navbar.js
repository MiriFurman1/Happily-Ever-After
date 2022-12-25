import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='Navbar'>
        <Link to="/"><h2> Happily Ever After</h2></Link>
        <div className='NavbarButtons'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </div>
    </div>
  )
}
