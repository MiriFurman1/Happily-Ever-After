import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function CreateNewEvent() {
    const navigate = useNavigate();
    const [weddingDate, setWeddingDate] = useState('');
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [location, setLocation] = useState('');
    const [guestsNum, setGuestsNum] = useState('');

    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const jwt = Cookies.get('jwt')
        // const weddingData = {
        //     brideName: brideName,
        //     groomName: groomName,
        //     weddingDate: weddingDate,
        //     location: location,
        //     guestsNum: guestsNum
        // }

        var data = JSON.stringify({
            brideName: brideName,
            groomName: groomName,
            weddingDate: weddingDate,
            guestNum: guestsNum,
            location: location,
            
        });
        console.log(`${apiUrl}/mywedding`)
        console.log(data);
        var config = {
            method: 'post',
            url: `${apiUrl}/mywedding`,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
            });



    }
    return (
        <div className='createNewEventPage'>
            <h3>Just a few details about your wedding</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Wedding Date:
                    <input
                        type="date"
                        name="weddingDate"
                        value={weddingDate}
                        onChange={(event) => setWeddingDate(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Bride's Name:
                    <input
                        type="text"
                        name="brideName"
                        value={brideName}
                        onChange={(event) => setBrideName(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Groom's Name:
                    <input
                        type="text"
                        name="groomName"
                        value={groomName}
                        onChange={(event) => setGroomName(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </label>
                <label>
                    Number of guests:
                    <input
                        type="text"
                        name="guestsNum"
                        value={guestsNum}
                        onChange={(event) => setGuestsNum(event.target.value)}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
