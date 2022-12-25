import axios from 'axios'

let myUrl="http://localhost:5000/api"

export const Api=axios.create({
    baseURL:myUrl,
})