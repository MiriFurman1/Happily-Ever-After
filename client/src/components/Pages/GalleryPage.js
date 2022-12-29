
import { useState } from 'react';


  let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
      apiUrl = '/api'}
    
function FileUploadMultiple() {
  const [eventId,setEventId]=useState(window.location.pathname.slice(13))
  const [fileList, setFileList] = useState(null);

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
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };


  const files = fileList ? [...fileList] : [];

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUploadMultiple;