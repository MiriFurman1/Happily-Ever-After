import React from 'react'
import { useState } from 'react'

export default function UploadImage() {
    const [values,setValues]=useState({
        file:"",
        formData:new FormData(),
        error:""
    })

    const {file,formData,error}=values

    const handleChange=(e)=>{
        const value=e.target.files[0];
        if(value){
            console.log(value);
        }
    }
  return (
    
    <form>

        <h1>Photo Gallery</h1>
        <label>
            <input onChange={(e)=>handleChange(e)} type="file" placeholder="choose file"/>
            <span>Add</span>
        </label>
    </form>
  )
}
