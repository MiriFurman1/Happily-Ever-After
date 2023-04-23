import axios from 'axios'



export let apiUrl = process.env.API_URL
export const Api=axios.create({
    baseURL:apiUrl,
})