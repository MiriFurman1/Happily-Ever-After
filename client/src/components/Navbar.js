import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Api } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Navbar() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState(Cookies.get('jwt'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [eventId,setEventId]=useState(null)


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


let apiUrl = "http://localhost:5000/api";
if(process.env.NODE_ENV==="production"){
apiUrl = '/api'
}


useEffect(() => {
  if(jwt){

    var data = '';
    var config = {
        method: 'get',
        url: `${apiUrl}/mywedding`,
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        data: data
    };
  
    axios(config)
        .then(function (response) {
          setEventId(response.data[0]._id)
          Cookies.set('eventId', response.data[0]._id)
        })
        .catch(function (error) {
            console.log(error);
        });
  }
  

}, [apiUrl, jwt,navigate])

//get userName and refresh
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

const galleryUrl = `gallerypage/${eventId}`
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
          
          {eventId&&(<div className='eventButtons'>
          <Link to="/todolist">To Do List</Link>
            <Link to={galleryUrl}>My Gallery</Link>
          <Link to="/myevent">My Event</Link>
            </div>)}

          <Link  onClick={handleLogout}>Logout</Link>

        </div>)}
      </div>
    </div>
  )
}
