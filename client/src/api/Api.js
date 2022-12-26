import axios from 'axios'



let apiUrl = "http://localhost:5000/api";
if(process.env.NODE_ENV==="production"){
apiUrl = '/api'
}
export const Api=axios.create({
    baseURL:apiUrl,
})