// frontend/src/components/ImageUploadForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Field from "./Field";
import Card from "./Card";
import EditCardModal from "./EditCardModal";

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCardList, setShowCardList] = useState(false);

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
      // After successful image upload, fetch and update the cards list
      fetchCards();
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setError(
        "An error occurred while processing the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setShowEditModal(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(
        `/api/cards/${editingCard.identificationNumber}`,
        updatedData
      );
      setEditingCard(null);
      setShowEditModal(false);
      // After successful update, fetch and update the cards list
      fetchCards();
    } catch (error) {
      console.error("Error updating card:", error.message);
      setError("An error occurred while updating the card. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);
      // After successful deletion, fetch and update the cards list
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error.message);
      setError("An error occurred while deleting the card. Please try again.");
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get("/api/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error.message);
      setError("An error occurred while fetching cards. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch initial cards data when the component mounts
    fetchCards();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{border:"1px solid white", padding:'10px'}}>
      <h2>Upload ID Card</h2>
      <div style={{display:"flex", marginBottom:''}}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          action="/api/uploadImage"
          method="post"
          onSubmit={handleSubmit}
        >
          <div>
            {selectedImage ? (
              <div style={{ width: "400px" }}>
                <img
                  alt="uploaded image"
                  src={URL.createObjectURL(selectedImage)}
                  style={{ maxWidth: "70%", margin: "40px 0 10px 10px" }}
                />
              </div>
            ) : (
              <p>Select an image</p>
            )}
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>

        <div>
          {result && (
            <div
              style={{ marginTop: "16px", textAlign: "left", width: "100%" }}
            >
              <h2>Results:</h2>
              <Field label="Name" value={result.name} />
              <Field label="Last Name" value={result.lastName} />
              <Field label="Date of Birth" value={result.dateOfBirth} />
              <Field
                label="Identification Number"
                value={result.identificationNumber}
              />
              <Field label="Date of Issue" value={result.dateOfIssue} />
              <Field label="Date of Expiry" value={result.dateOfExpiry} />
            </div>
          )}
        </div>
      </div>
      </div>
      
      

      <div style={{ marginTop: "32px", }}>
        <button onClick={() => setShowCardList(!showCardList)}>
          {showCardList ? "Hide Card List" : "Show Card List"}
        </button>
        {showCardList && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {cards.map((card) => (
              <Card
                key={card.identificationNumber}
                card={card}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showEditModal && (
        <EditCardModal
          card={editingCard}
          onUpdate={handleUpdate}
          onClose={() => {
            setEditingCard(null);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ImageUploadForm;
