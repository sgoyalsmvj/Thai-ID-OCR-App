import React, { useState } from 'react'
import axios from 'axios';

const ImageUploadForm = () => {

    const [selectedImage,setSelectedImage] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!selectedImage){
            alert('Please select an image');
        }
        try{
            const formData = new FormData();
            formData.append('file',selectedImage);
            const response = await axios.post('/api/uploadImage',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            });
        }
        catch(error){
            console.error('Error uploading file:',error);
        }

    }
  return (
    <div>
        <h1>Upload ID card</h1>
        <form action="/api/uploadImage" method='post' onSubmit={handleSubmit}> 
            {selectedImage? <img alt='uploaded image' src ={URL.createObjectURL(selectedImage)} /> : <p>Select an image</p>}
            <input type="file" onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default ImageUploadForm