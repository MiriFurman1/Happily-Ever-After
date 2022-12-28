import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../style/MyEvent.css'

export default function MyEvent() {
    const [event, setEvent] = useState(null)
    const jwt = Cookies.get('jwt')

    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }
    useEffect(() => {
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
                setEvent(response.data[0])
                console.log(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [apiUrl, jwt])
    return (
        <div className='MyEvent'>

            {event && <div>
                <h2>Our wedding</h2>
                <h4>{event.brideName}&{event.groomName}</h4>
                <h4>Date: {event.weddingDate.substring(0, 10)}</h4>
                <h4>Location:{event.location}</h4>
                <h4>Number of guests: {event.guestNum}</h4>
                <button>Edit wedding</button>
                <button>Delete wedding</button>
                <button>Guest list</button>
            </div>}

        </div>
    )
}
