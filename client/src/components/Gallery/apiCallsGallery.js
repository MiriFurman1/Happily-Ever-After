let apiUrl = "http://localhost:5000/api";
if(process.env.NODE_ENV==="production"){
apiUrl = '/api'
}

export const uploadData=async (data)=>{
    return fetch(`${apiUrl}/add/image`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response=>console.log(response))
    .catch(err=>console.log(err))
}