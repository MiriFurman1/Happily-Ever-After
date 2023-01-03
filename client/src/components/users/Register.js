import React from 'react'
import "../../style/Forms.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Api } from '../../api/Api.js';
import axios from 'axios'


export default function Register() {
	const navigate = useNavigate();
	const [name,setName]=useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }
	async function registerUser(e) {
		e.preventDefault()
		try {
			
			const response = await Api.post('/register', {
				name,
				email,
				password,
			});
			const data = response.data;
			const token=data.token;
			Cookies.set('jwt', token, { expires: 7 });
			localStorage.setItem('userName',JSON.stringify(data.user.name))
			const jwt =  Cookies.get('jwt')
			console.log(jwt);
			if (data) {
				var body= JSON.stringify({
					brideName:"",
					groomName: "",
					weddingDate: "",
					guestNum: "",
					location: "",
		
				});
		
				var config = {
					method: 'post',
					url: `${apiUrl}/mywedding`,
					headers: {
						'Authorization': `Bearer ${jwt}`,
						'Content-Type': 'application/json'
					},
					data: body
				};
		
				axios(config)
					.then(function (response) {
						console.log(JSON.stringify(response.data._id));
						localStorage.setItem('eventId', JSON.stringify(response.data._id))
						if(response){
							addUserTasks()
						}
					})
					.catch(function (error) {
						console.log(error);
					});
					
			}
		} catch (error) {
			console.error(error);
		}
	}

	const addUserTasks=()=>{

	const tasks=[{"description":"Find Your Venue","category":"4 months to go"},{"description":"Start Planning Your Guest List","category":"4 months to go"},{"description":"Set A Budget","category":"4 months to go"},
	{"description":"Find A Florist","category":"3 months to go"},{"description":"Plan Your Hair And Makeup","category":"3 months to go"},
	{"description":"Send Out Invitations","category":"2 months to go"},{"description":"Make Your Sitting Chart","category":"2 months to go"},
	{"description":"Have a Final Dress Fitting","category":"1 months to go"},
	{"description":"Confirm Everything","category":"1 week to go"},
	{"description":"Enjoy","category":"Wedding Day"}]
	const jwt =  Cookies.get('jwt')
	tasks.forEach((task)=>{
		var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "description": task.description,
            "category": task.category
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/tasks`, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result)
			navigate('/')})
            .catch(error => console.log('error', error));

	})
	}
		return (
			<div className='Register'>
				<div className='RegisterDiv'>
				<h3>Register</h3>
				<form onSubmit={registerUser}>
				<label htmlFor='name'>name</label>
					<input type="string" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
					<label htmlFor='email'>email</label>
					<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
					<label htmlFor='password'>password</label>
					<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
					<button type="submit">Register</button>
				</form>
			</div>
			</div>
		)
	}
