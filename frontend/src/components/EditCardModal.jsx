// frontend/src/components/EditCardModal.js
import React, { useState } from "react";

const EditCardModal = ({ card, onUpdate, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    name: card.name,
    lastName: card.lastName,
    dateOfBirth: card.dateOfBirth,
    identificationNumber: card.identificationNumber,
    dateOfIssue: card.dateOfIssue,
    dateOfExpiry: card.dateOfExpiry,
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedData);
    onClose();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "400px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", color:'black'}}>Edit Card</h2>
        <form onSubmit={handleSubmit} style={{color:"black"}}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{  marginBottom: "4px",margin:'6px' }}>Name:</label>
            <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} style={{padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginBottom: "4px",margin:'6px'  }}>Last Name:</label>
            <input type="text" name="lastName" value={updatedData.lastName} onChange={handleInputChange} style={{  padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginBottom: "4px" ,margin:'6px' }}>Date of Birth:</label>
            <input type="text" name="dateOfBirth" value={updatedData.dateOfBirth} onChange={handleInputChange} style={{  padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginBottom: "4px" ,margin:'6px' }}>Identification Number:</label>
            <input type="text" name="identificationNumber" value={updatedData.identificationNumber} onChange={handleInputChange} style={{  padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginBottom: "4px" ,margin:'6px' }}>Date of Issue:</label>
            <input type="text" name="dateOfIssue" value={updatedData.dateOfIssue} onChange={handleInputChange} style={{  padding: "8px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginBottom: "4px",margin:'6px'  }}>Date of Expiry:</label>
            <input type="text" name="dateOfExpiry" value={updatedData.dateOfExpiry} onChange={handleInputChange} style={{  padding: "8px", boxSizing: "border-box" }} />
          </div>
          {/* Add other input fields as needed */}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit" style={{ padding: "8px 16px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Update</button>
            <button type="button" onClick={onClose} style={{ padding: "8px 16px", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCardModal;
