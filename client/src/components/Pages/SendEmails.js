import React, { useEffect } from 'react'
// import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { apiUrl } from '../../api/Api.js'

export default function SendEmails() {
  const [guestEmails, setGuestEmails] = useState(null)
  const [subject, setSubject] = useState(null)
  const [body, setBody] = useState(null)
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation();
  const state = location.state




  useEffect(() => {

    if (!state) {
      console.log("milky");
      navigate("/")
    }
  })
  useEffect(() => {

    if ((!state) || location.state.guests == null) {
      navigate("/")
    }
    else {
      setGuestEmails(location.state.guests.map((guest) => {
        return guest.email
      }))
    }
  }, [location.state, navigate, state])



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(image);
    console.log(JSON.stringify(guestEmails));
    console.log(typeof(guestEmails));
    // var myHeaders = {Accept:'application/json'};
    

  
    var formdata = new FormData();
    formdata.append("subject", subject);
    formdata.append("body", body);
    formdata.append("guestEmails", JSON.stringify(guestEmails));
    formdata.append("image", image);

    var requestOptions = {
      method: 'POST',
      // headers: {'Content-Type':'multipart/form-data; boundary=MyBoundary' },
      headers: {},
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${apiUrl}/send-emails`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("emails Sent!")
        setSubject("")
        setBody("")
        setImage("")
        window.location.reload(false);
      })
      .catch(error => console.log('error', error));

  };
  return (

    <div className='EmailPage'>
      <div className='EmailDiv'>
        <form encType="multipart/form-data"  >
          <h3>Send updates to your guests</h3>
          <label htmlFor="subject">Subject:</label><br />
          <input type="text" id="subject" name="subject" onChange={(event) => setSubject(event.target.value)} /><br/>
          <label htmlFor="body">Body:</label><br />
          <textarea id="body" name="body"  onChange={(event) => setBody(event.target.value)}></textarea> <br/>
          <label htmlFor="image">Image:</label><br />
          <input type="file" id="image" name="image" onChange={(event) => {
            console.log(event.target.files[0]);
            setImage(event.target.files[0])}}/> <br/>
          <button type="submit" onClick={handleSubmit}>Send Email</button>
        </form>
      </div>
    </div>
  )
}
