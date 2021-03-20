import axios from 'axios';
import React, { useState } from 'react';

const Upload = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleFileChange = (e) => {
    setSelectedImg(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myfile', selectedImg);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post('/pictures/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  };

  return (
    <div>
      <form
      // action="localhost:3001/pictures/upload"
      // method="post"
      // encType="multipart/form-data"
      >
        <input type="file" name="myImage" onChange={handleFileChange} />
        <button onClick={handleSubmit}>submit</button>
      </form>
    </div>
  );
};

export default Upload;
