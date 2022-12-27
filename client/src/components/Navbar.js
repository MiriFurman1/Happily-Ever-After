import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';


export default function Navbar() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem('userName');
    if (userData) {
      setUserName(JSON.parse(userData));
    }
  }, []);

  return (
    <div className='Navbar'>
      
        <Link to="/"><h2> Happily Ever After</h2></Link>
        {userName&&<p>Hi, {userName}!</p>}
        
        <div className='NavbarButtons'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {userName&&(<div className='userButtons'>
          <Link to="/myprofile">My Profile</Link>
          <Link to="/logout">Logout</Link>
        </div>)}
        </div>
    </div>
  )
}
