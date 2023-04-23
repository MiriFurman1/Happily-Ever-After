// import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { Api } from './api/Api.js';


// let apiUrl = "http://localhost:5000/api";
// if(process.env.NODE_ENV==="production"){
// apiUrl = '/api'
// }
let apiUrl = process.env.API_URL

export const handleGuest = async () => {

    console.log(uuidv4());
    try {
        let name = 'guest' + uuidv4().slice(0, 5)
        let email = uuidv4() + '@example.com'
        let password = uuidv4()
        const response = await Api.post('/register', {
            name,
            email,
            password,
        });
        const data = response.data;
        const token = data.token;
        Cookies.set('jwt', token, { expires: 7 });
        localStorage.setItem('userName', JSON.stringify(data.user.name))
        const jwt = Cookies.get('jwt')
        console.log(jwt);
        if (data) {
            var body = JSON.stringify({
                brideName: "",
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
                    if (response) {
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

const addUserTasks = () => {
    // const navigate = useNavigate();
    const tasks = [{ "description": "Find Your Venue", "category": "4 months to go" }, { "description": "Start Planning Your Guest List", "category": "4 months to go" }, { "description": "Set A Budget", "category": "4 months to go" },
    { "description": "Find A Florist", "category": "3 months to go" }, { "description": "Plan Your Hair And Makeup", "category": "3 months to go" },
    { "description": "Send Out Invitations", "category": "2 months to go" }, { "description": "Make Your Sitting Chart", "category": "2 months to go" },
    { "description": "Have a Final Dress Fitting", "category": "1 months to go" },
    { "description": "Confirm Everything", "category": "1 week to go" },
    { "description": "Enjoy", "category": "Wedding Day" }]
    const jwt = Cookies.get('jwt')
    tasks.forEach((task) => {
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
            .then(result =>console.log(result)
                // navigate('/')
                )
            .catch(error => console.log('error', error));

    })
}