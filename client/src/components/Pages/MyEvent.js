import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../style/MyEvent.css'
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/modal.js'

export default function MyEvent() {
    const navigate = useNavigate();
    const [jwt] = useState(Cookies.get('jwt'));
    const [event, setEvent] = useState(null);
    const [weddingDate, setWeddingDate] = useState('');
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [location, setLocation] = useState('');
    const [isEditing, setIsEditing] = useState(true)
    const [brideGuests, setBrideGuests] = useState([])
    const [groomGuests, setGroomGuests] = useState([])

    useEffect(() => {
        if (!jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

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
                setBrideName(response.data[0].brideName)
                setGroomName(response.data[0].groomName)
                setWeddingDate(response.data[0].weddingDate.slice(0, 10))
                setLocation(response.data[0].location)
                setBrideGuests(response.data[0].guests.filter(guest => guest.side === 'bride'))
                setGroomGuests(response.data[0].guests.filter(guest => guest.side === 'groom'))
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [apiUrl, jwt])



    const updateWedding = async (e) => {
        console.log(event);
        e.preventDefault()
        try {

            var data = JSON.stringify({
                brideName: brideName,
                groomName: groomName,
                weddingDate: weddingDate,
                location: location,
            });

            const config = {
                method: 'PATCH',
                url: `${apiUrl}/mywedding`,
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                data: data

            };

            const response = await axios(config);
            console.log(response.data);
            setIsEditing(false)
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className='MyEvent'>
            <Modal/>
            <div className='EventDiv'>
                <h3>Just a few details about your wedding</h3>
                {isEditing ? (<form onSubmit={updateWedding}>
                    <label>
                        Wedding Date: &nbsp;
                        <input
                            type="date"
                            name="weddingDate"
                            value={weddingDate}
                            onChange={(event) => setWeddingDate(event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Bride's Name: &nbsp;
                        <input
                            type="text"
                            name="brideName"
                            value={brideName}
                            onChange={(event) => setBrideName(event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Groom's Name: &nbsp;
                        <input
                            type="text"
                            name="groomName"
                            value={groomName}
                            onChange={(event) => setGroomName(event.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Location: &nbsp;
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </label>
                    <br />
                    <h4>Guest List</h4>
                    <div className='GuestList'>
                        
                        <label>
                            Bride Guests:
                            {brideGuests && brideGuests.map((guest) => {
                                return <input
                                    type="text"
                                    name="guest"
                                    value={guest.name}
                                    // onClick={}
                                // onChange={(event) => setLocation(event.target.value)}
                                />
                            })}
                            <button>Add bride guests</button>
                        </label>
                        <label>
                            Groom Guests:
                            {groomGuests && groomGuests.map((guest) => {
                                return <input
                                    type="text"
                                    name="guest"
                                    value={guest.name}
                                // onChange={(event) => setLocation(event.target.value)}
                                />
                            })}
                            <button>Add Groom guests</button>
                        </label>
                    </div>
                    <button type="submit" value="Submit">Save</button>
                </form>
                ) : (
                    <form >
                        <label>
                            Wedding Date:&nbsp;
                            <input
                                type="date"
                                name="weddingDate"
                                value={weddingDate}
                                onChange={(e) => e.preventDefault()}
                            />
                        </label>
                        <br />
                        <label>
                            Bride's Name:&nbsp;
                            <input
                                type="text"
                                name="brideName"
                                value={brideName}
                                onChange={(e) => e.preventDefault()}
                            />
                        </label>
                        <br />
                        <label>
                            Groom's Name:&nbsp;
                            <input
                                type="text"
                                name="groomName"
                                value={groomName}
                                onChange={(e) => e.preventDefault()}
                            />
                        </label>
                        <br />
                        <label>
                            Location:&nbsp;
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => e.preventDefault()}
                            />
                        </label>
                        <h4>Guest List</h4>
                        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit wedding</button>}
                        <br />
                    </form>)}
                <div>





                </div>
            </div>


        </div>
    )
}
