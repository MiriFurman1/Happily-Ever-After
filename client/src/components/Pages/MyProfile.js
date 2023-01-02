import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { Api } from '../../api/Api';
import { useState } from 'react';
import '../../style/MyProfile.css'
import { useNavigate } from 'react-router-dom';


export default function MyAccount() {
    const [userData, setUserData] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [imgUrl, setImgUrl] = useState("")
    // const [eventId,setEventId]=useState()
    const [editForm, setEditForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const jwt = Cookies.get('jwt')
    const eventId = Cookies.get('eventId')
    console.log(eventId);
    const navigate = useNavigate();



    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }

    const fileSelectedHandler = async (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUploadImage = () => {
        const fd = new FormData();
        fd.append('image', selectedFile)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);

        var formdata = new FormData();
        formdata.append("avatar", selectedFile);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/users/me/avatar`, requestOptions)
            .then(response => response.text())
            .then(result =>
                window.location.reload(false)
            )
            .catch(error => console.log('error', error));
    }

    const openUpload = () => {
        setIsUploading(prev => !prev)
    }

    useEffect(() => {
        Api.get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => {
                const userProfile = response.data;
                setUserData(userProfile);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [jwt])

    function handleDelete() {
        Api.delete(`/users/me`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then((response) => {
                if (response.data) {
                    localStorage.removeItem('userName');
                    Cookies.remove('jwt');
                    Cookies.remove('eventId');
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleEdit() {
        setEditForm(prev => !prev)
    }

    useEffect(() => {
        (userData && userData.avatar !== "") && setImgUrl(`${apiUrl}/users/${userData._id}/avatar`)
    }, [userData, apiUrl])

    const addNewEvent = () => {
        navigate('/createnewevent')
    }

    function handleDeleteImage() {
        Api.delete(`/users/me/avatar`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then((response) => {
                setImgUrl(null);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <div className='MyProfile'>
            {userData && (<div>
                <h3>My profile</h3>
                {(imgUrl&&userData.avatar!=="" )&& (
                    <div>
                        <img src={imgUrl} alt="Profile" />
                        <button onClick={handleDeleteImage}>Delete Image</button>
                    </div>
                )}
                <h4>Name: {userData.name}</h4>
                <h4>Email:{userData.email}</h4>
                <button onClick={handleEdit}>Edit Profile</button>
                <button onClick={handleDelete}>Delete Profile</button>
                {!eventId && <button onClick={addNewEvent}>add new event</button>}
                <button onClick={openUpload}>upload a profile picture</button>

                {isUploading ? (<div>
                    <input type="file" onChange={fileSelectedHandler} />
                    <button onClick={handleUploadImage}> upload</button>
                </div>) : ""}

            </div>)}
            {editForm && (
                <form>
                    <h5>Edit your profile</h5>
                    <label htmlFor='name'>name</label>
                    <input type="string" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label htmlFor='email'>email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='password'>password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">confirm</button>
                    <button>cancel</button>
                </form>
            )}
        </div>
    )
}
