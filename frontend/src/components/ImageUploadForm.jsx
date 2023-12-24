import React, { useState } from 'react'

const ImageUploadForm = () => {

    const [selectedImage,setSelectedImage] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!selectedImage){
            alert('Please select an image');
        }
    }
  return (
    <div>
        <h1>Upload ID card</h1>
        <form action="/uploadImage" method='post' onSubmit={handleSubmit}> 
            {selectedImage? <img alt='uploaded image' src ={URL.createObjectURL(selectedImage)} /> : <p>Select an image</p>}
            <input type="file" onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default ImageUploadForm