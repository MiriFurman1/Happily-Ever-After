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
    const [imgUrl,setImgUrl]=useState("")

    const jwt = Cookies.get('jwt')
    const navigate = useNavigate();

    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }

    const fileSelectedHandler = async (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0])

    }

    const handleUploadImage=()=>{
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
                navigate('/')
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
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(()=>{
        (userData&&userData.avatar!=="")&&setImgUrl(`${apiUrl}/users/${userData._id}/avatar`)
    },[ userData,apiUrl])
    
    const addNewEvent=()=>{
        navigate('/createnewevent')
    }
    return (
        <div className='MyProfile'>
            {userData && (<div>
                <h3>My profile</h3>
                {imgUrl&&<img src={imgUrl} alt="" width="200"></img>}
                <h4>Name: {userData.name}</h4>
                <h4>Email:{userData.email}</h4>
                <button >Edit Profile</button>
                <button onClick={handleDelete}>Delete Profile</button>
                <button onClick={addNewEvent}>add new event</button>
                <button onClick={openUpload}>upload a profile picture</button>
                
                {isUploading ? (<div>
                    <input type="file" onChange={fileSelectedHandler} />
                    <button onClick={handleUploadImage}> upload</button>
                </div>) : ""}

            </div>)}

        </div>
    )
}
