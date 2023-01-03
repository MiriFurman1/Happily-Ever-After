import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';

export default function SendEmails() {
  const [guestEmails, setGuestEmails] = useState(null)
  const [subject,setSubject]=useState(null)
  const [body,setBody]=useState(null)
  const [image,setImage]=useState(null)
  const navigate=useNavigate()
  const location = useLocation();
  const state=location.state


  

  useEffect(() => {

    if(!state){
      console.log("milky");
    navigate("/")
    }
  })
  useEffect(() => {

    if((!state)||location.state.guests==null){
    navigate("/")
    }
    else{
      setGuestEmails(location.state.guests.map((guest)=>{
        return guest.email
      }))
    }

  
  }, [location.state,navigate,state])


  let apiUrl = "http://localhost:5000/api";
  if (process.env.NODE_ENV === "production") {
      apiUrl = '/api'
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData(event.target);
    var data = JSON.stringify({
      guestEmails: guestEmails,
      subject: subject,
      body: body,
      image: image,
  });
    axios.post(`${apiUrl}/send-emails`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        alert('Emails sent successfully!');
      })
      .catch(error => {
        alert('Error sending emails: ' + error.message);
      });
  };
  return (

    <div className='EmailPage'>
      <div className='EmailDiv'>
        <form enctype="multipart/form-data"  >
          <h3>Send updates to your guests</h3>
          <label htmlFor="subject">Subject:</label><br />
          <input type="text" id="subject" name="subject" onChange={(event) => setSubject(event.target.value)}/><br />
          <label htmlFor="body">Body:</label><br />
          <textarea id="body" name="body"></textarea><br onChange={(event) => setBody(event.target.value)}/>
          <label htmlFor="image">Image:</label><br />
          <input type="file" id="image" name="image" /><br onChange={(event) => setImage(event.target.value)}/>
          <button type="submit" onClick={handleSubmit}>Send Email</button>
        </form>
      </div>
    </div>
  )
}
