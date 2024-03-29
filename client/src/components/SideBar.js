import React from 'react'
import '../style/Sidebar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Api } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { slide as Menu } from 'react-burger-menu';
import { handleGuest } from '../utils';
import { apiUrl } from '../api/Api.js'

export default function SideBar() {
    const navigate = useNavigate();
    const [jwt, setJwt] = useState(Cookies.get('jwt'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [eventId, setEventId] = useState(null)


    function handleLogout() {
        Api.post(`/users/logout`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => {
                console.log(response);
                localStorage.removeItem('userName');
                Cookies.remove('jwt')
                Cookies.remove('eventId');
                
                navigate("/")
            })
            .catch((error) => {
                console.error(error);
            });
    }




    useEffect(() => {
        if (jwt) {
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
                    // console.log(response.data[0]._id);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }, [apiUrl, jwt, navigate])

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

    useEffect(() => {
        const menuElement = document.querySelector('.bm-menu');
        menuElement.style.overflowY = 'hidden';
    }, [])


    const galleryUrl = `gallerypage/${eventId}`
    return (
        <div >
            <Menu >
                <div className='MySidebar' scroll="no">
                    <Link to="/"><h2> Happily Ever After</h2></Link>
                    {jwt && <p>Hi, {JSON.parse(userName)}!</p>}

                    <div >
                        <Link to="/">Home</Link>
                        {!jwt && (<div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            <Link onClick={handleGuest}>Start As Guest</Link>
                        </div>)}

                        {jwt && (<div >
                            <Link to="/myprofile">My Profile</Link>
                            
                            {eventId && (<div >
                                <Link to="/todolist">To Do List</Link>
                                <Link to={galleryUrl}>My Gallery</Link>
                                <Link to="/myevent">My Event</Link>
                            </div>)}

                            <Link onClick={handleLogout}>Logout</Link>
                        </div>)}
                    </div>
                </div>
            </Menu>
        </div>

    )
}
