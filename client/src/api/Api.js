import axios from 'axios'
// import dotenv from 'dotenv';


export let apiUrl = "http://localhost:5000/api";
if(process.env.NODE_ENV==="production"){
apiUrl = process.env.REACT_APP_API_URL
}
export const Api=axios.create({
    baseURL:apiUrl,
})