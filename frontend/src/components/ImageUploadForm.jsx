import React, { useState } from "react";
import axios from "axios";
import Card from "./Card"; // Import the Card component

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setError("An error occurred while processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
       <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      
      <div style={{ marginRight: "20px" }}>
        
        <form
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          action="/api/uploadImage"
          method="post"
          onSubmit={handleSubmit}
        >
          {selectedImage ? (
            <img
              alt="uploaded image"
              src={URL.createObjectURL(selectedImage)}
              style={{ maxWidth: "75%" }}
            />
          ) : (
            <p>Select an image</p>
          )}
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      {result && <Card data={result} />}
    </div>
    </>
 
  );
};

export default ImageUploadForm;
