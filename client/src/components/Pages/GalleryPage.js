import React from 'react'
import Cookies from 'js-cookie'
import UploadImage from '../UploadImage';


export default function GalleryPage() {
  const jwt = Cookies.get('jwt')
  console.log(jwt);
  return (
    <div className='GalleryPage'>
      <UploadImage/>

    </div>
  )
}
