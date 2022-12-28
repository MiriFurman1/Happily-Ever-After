import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Api } from '../api/Api';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState(Cookies.get('jwt'));

  function handleLogout() {
    Api.post(`/users/logout`,{}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    .then((response) => {
        console.log(response);
        localStorage.removeItem('userName');
        Cookies.remove('jwt')
        navigate("/")
      })
      .catch((error) => {
        console.error(error);
      });
  }




  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    const interval = setInterval(() => {
      const newUserName = localStorage.getItem('userName');
      if (newUserName !== userName) {
        setUserName(newUserName);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [userName]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      const newJwt = Cookies.get('jwt');
      if (newJwt !== jwt) {
        setJwt(newJwt);
      }
    }, 1000);



    return () => {
      clearInterval(interval);
    };
  }, [jwt]);

  return (
    <div className='Navbar'>

      <Link to="/"><h2> Happily Ever After</h2></Link>
      {jwt && <p>Hi, {JSON.parse(userName)}!</p>}

      <div className='NavbarButtons'>
        <Link to="/">Home</Link>
        {!jwt && (<div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>)}

        {jwt && (<div className='userButtons'>
          <Link to="/myprofile">My Profile</Link>
          <Link to="/todolist">To Do List</Link>
          <Link to="gallerypage">My Gallery</Link>
          <Link to="/myevent">My Event</Link>
          <Link  onClick={handleLogout}>Logout</Link>

        </div>)}
      </div>
    </div>
  )
}
