
import { useEffect, useState } from 'react';
import '../../style/GalleryPage.css'
import { MyGallery } from './MyGallery.js'
import Cookies from 'js-cookie'
import { apiUrl } from '../../api/Api.js'


// let apiUrl = "http://localhost:5000/api";
// if (process.env.NODE_ENV === "production") {
//   apiUrl = '/api'
// }

function GalleryPage() {
  const [eventId] = useState(window.location.pathname.slice(13))
  const [fileList, setFileList] = useState(null);
  const [numOfImg, setNumOfImg] = useState(0)
  const [jwt] = useState(Cookies.get('jwt'));
  const [urlEncoded, setUrlEncoded] = useState(null)
  const [siteLink] = useState(window.location.href)
  useEffect(() => {

    fetch(`${apiUrl}/gallery/${eventId}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length)
        setNumOfImg(data.length)
      })
      .catch((err) => console.error(err));

  }, [eventId])


  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }


    const data = new FormData();
    files.forEach((file) => {
      data.append(`images`, file, file.name);
    });


    fetch(`${apiUrl}/gallery/uploadimage/${eventId}`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        window.location.reload()
      })
      .catch((err) => console.error(err));
  };


  const files = fileList ? [...fileList] : [];


  let images = []

  for (let i = 0; i < numOfImg; i++) {
    let obj = {
      original: `${apiUrl}/images/${eventId}/${i}`,
      thumbnail: `${apiUrl}/images/${eventId}/${i}`,
      originalWidth: "400"
    }
    images.push(obj)
  }

  useEffect(() => {
    setUrlEncoded(`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(siteLink)}&size=200x200`)

  }, [siteLink])

  return (
    <div className='GalleryPage'>
      {numOfImg !== 0 && <MyGallery images={images} />}
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUploadClick}>Upload</button>
      {jwt && (<div className='card'>
        <div className='cardText'> 
        <p>Please share this link with your guests to allow them to upload photos from your wedding:  </p>
        <a href={siteLink}>{siteLink}</a>
        {urlEncoded && <p>Or just you can print the following code and provide it to your guests so they can easily upload their photos</p>}
        </div>
        {urlEncoded && <div className='QRDiv'>

          <img src={urlEncoded} alt="" width="200px"></img>
        </div>}
      </div>)}







    </div>
  );
}

export default GalleryPage;