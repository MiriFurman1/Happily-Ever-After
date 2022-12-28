import React from 'react'

export default function GalleryPage() {
  const fileSelectedHandler=(event)=>{
    console.log(event);
  }
  return (
    <div className='GalleryPage'>

      <input type="file" onChange={fileSelectedHandler}/>
    </div>
  )
}
