import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../style/MyEvent.css'
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/modal.js'
import {Link} from 'react-router-dom'


export default function MyEvent() {

    const navigate = useNavigate();
    const [jwt] = useState(Cookies.get('jwt'));
    const [event, setEvent] = useState(null);
    const [weddingDate, setWeddingDate] = useState('');
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [location, setLocation] = useState('');
    const [brideGuests, setBrideGuests] = useState([])
    const [groomGuests, setGroomGuests] = useState([])
    const [modal, setModal] = useState(false);
    const [currentGuest, setCurrentGuest] = useState({})
    const [guests, setGuests] = useState([]);
    

    const toggleModal = (guest) => {
        if(guest){
            setCurrentGuest(guest)
        }
        else {
            setCurrentGuest({
                name: "",
                email: "",
                numberOfGuests: "",
                side: "",
            })
        }
        setModal(!modal);
    };


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
                console.log(response.data);
                setBrideName(response.data[0].brideName)
                setGroomName(response.data[0].groomName)
                setWeddingDate((prev)=>{
                    if(response.data[0].weddingDate){
                        return response.data[0].weddingDate.slice(0, 10)
                    }
                    else{
                        return "2023-01-01"
                    }
                })
                setLocation(response.data[0].location)
                setBrideGuests(response.data[0].guests.filter(guest => guest.side === 'bride'))
                setGroomGuests(response.data[0].guests.filter(guest => guest.side === 'groom'))
                setGuests(response.data[0].guests)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [apiUrl, jwt])



    const updateWedding = async (e) => {
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
        } catch (error) {
            console.error(error);
        }
    }
    console.log(event);


    return (
        <div className='MyEvent'>
            <Modal modal={modal} toggleModal={toggleModal} currentGuest={currentGuest} guests={guests} />
            <div className='EventDiv'>

                <h3>Just a few details about your wedding</h3>

                <form onSubmit={updateWedding}>
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
                        Location: &nbsp;
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </label>
                    <br />
                    <div className='iconDiv'>
                        <img src="/images/icons8-bride-100.png" alt="bride" />
                        <img src="/images/icons8-groom-100.png" alt="groom" />
                    </div>
                    <div className='iconDiv'>
                        <label>
                            Name: &nbsp;
                            <input
                                type="text"
                                name="brideName"
                                value={brideName}
                                onChange={(event) => setBrideName(event.target.value)}
                            />
                        </label>
                        <br />

                        <label>
                            Name: &nbsp;
                            <input
                                type="text"
                                name="groomName"
                                value={groomName}
                                onChange={(event) => setGroomName(event.target.value)}
                            />
                        </label>
                    </div>
                    <h4>Guest List</h4>
                    <div className='GuestList'>

                        <label>
                            Bride Guests:
                            {console.log(guests)}
                            {brideGuests && brideGuests.map((guest) => {
                                return <input
                                    type="text"
                                    name="guest"
                                    value={guest.name}
                                    onClick={() => toggleModal(guest)}

                                />
                            })}
                            {/* <label>
                                number of guests :{brideGuests.length}
                            </label> */}
                        </label>
                        <label>
                            Groom Guests:
                            {groomGuests && groomGuests.map((guest) => {
                                return <input
                                    type="text"
                                    name="guest"
                                    value={guest.name}
                                    onClick={() => toggleModal(guest)}

                                />
                            })}
                            {/* <label>
                                number of guests :{groomGuests.length}
                            </label> */}
                        </label>

                    </div>
                            <div className='EventButtonsDiv'>
                    <button type="submit" value="Submit">Save</button>
                    <button onClick={() => toggleModal()}>Add guests</button>
                    <Link to="/sendemails" state={event} className="link"><button>Send emails to your guests</button></Link>
                    </div>
                </form>

                <div>





                </div>
            </div>


        </div>
    )
}
