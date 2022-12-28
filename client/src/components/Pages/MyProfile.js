import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { Api } from '../../api/Api';
import { useState } from 'react';
import '../../style/MyProfile.css'
import { useNavigate } from 'react-router-dom';

export default function MyAccount() {
    const [userData, setUserData] = useState(null)
    const jwt = Cookies.get('jwt')
    const navigate = useNavigate();


    useEffect(() => {
        Api.get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => {
                const userProfile = response.data;
                setUserData(userProfile);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [jwt])

    function handleDelete() {
        Api.delete(`/users/me`, {
            headers: {
               
                'Authorization':`Bearer ${jwt}`
            },
        })
            .then((response) => {
                if (response.data) {
                    localStorage.removeItem('userName');
                    Cookies.remove('jwt');
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='MyProfile'>
            {userData && (<div>
                <h3>My profile</h3>
                <h4>Name: {userData.name}</h4>
                <h4>Email:{userData.email}</h4>
                <button >Edit Profile</button>
                <button onClick={handleDelete}>Delete Profile</button>
                <button>add new event</button>
            </div>)}

        </div>
    )
}
