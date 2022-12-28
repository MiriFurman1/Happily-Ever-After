import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateNewEvent() {
    const navigate = useNavigate();
    const [weddingDate, setWeddingDate] = useState('');
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/")

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
                <br />
                <input type="submit" value="Submit"  />
            </form>
        </div>
    )
}
