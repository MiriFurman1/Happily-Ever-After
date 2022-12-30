import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import '../../style/GalleryPage.css'
import {MyGallery} from './MyGallery.js'



  let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
      apiUrl = '/api'}
    
function GalleryPage() {
  const [eventId]=useState(window.location.pathname.slice(13))
  const [fileList, setFileList] = useState(null);
  const [imageArray,setImageArray]=useState([])
  const [imgUrl,setImgUrl]=useState([])
  const [numOfImg,setNumOfImg]=useState(0)

useEffect(()=>{
  
  fetch(`${apiUrl}/gallery/${eventId}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => {console.log(data.length)
      setNumOfImg(data.length)})
    .catch((err) => console.error(err));

},[eventId])




useEffect(() => {
  if (imageArray && imageArray.length !== 0) {
    const imgUrls = imageArray.map(imageBuffer => new Buffer.from(imageBuffer).toString("base64"));
    setImgUrl(imgUrls);
  }
}, [imageArray]);


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
      .then((data) => {console.log(data)
        
        window.location.reload()})
      .catch((err) => console.error(err));
  };


  const files = fileList ? [...fileList] : [];


  let images=[]

  for(let i=0;i<numOfImg;i++){
    let obj={original:`${apiUrl}/images/${eventId}/${i}`,
    thumbnail:`${apiUrl}/images/${eventId}/${i}`}
    images.push(obj)
  }


  return (
    <div className='GalleryPage'>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUploadClick}>Upload</button>

{numOfImg!==0&&<MyGallery images={images}/>}

    </div>
  );
}

export default GalleryPage;