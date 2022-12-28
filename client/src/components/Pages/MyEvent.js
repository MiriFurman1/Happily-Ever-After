import React from 'react'
import Cookies from 'js-cookie';

export default function MyEvent() {
    const jwt = Cookies.get('jwt')
    console.log(jwt);
  return (
    <div>
        <h4>My Event</h4>
        
        </div>
  )
}
