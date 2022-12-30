import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import '../../style/GalleryPage.css'




  let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
      apiUrl = '/api'}
    
function GalleryPage() {
  const [eventId]=useState(window.location.pathname.slice(13))
  const [fileList, setFileList] = useState(null);
  const [imageArray,setImageArray]=useState([])
  const [imgUrl,setImgUrl]=useState([])

useEffect(()=>{
  
  fetch(`${apiUrl}/gallery/${eventId}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => {console.log(data)
      setImageArray(data)})
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

  return (
    <div className='GalleryPage'>
     {/* <img src={`data:image/png;base64,${imgUrl}`} alt=""/> */}
   
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUploadClick}>Upload</button>
      <div className='image-grid'>
      {imgUrl.map((imgUrl, index) => (
  <img key={index} src={`data:image/png;base64,${imgUrl}`} alt=""/>
))}
</div>
    </div>
  );
}

export default GalleryPage;