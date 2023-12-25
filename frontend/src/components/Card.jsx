import React from "react";

const Card = ({ data }) => (
  <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px", width:"max-content", textAlign: "left" }}>
    <h2>Results:</h2>
    <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Last Name:</strong> {data.lastName}</p>
    <p><strong>Date of Birth:</strong> {data.dateOfBirth}</p>
    <p><strong>Identification Number:</strong> {data.identificationNumber}</p>
    <p><strong>Date of Issue:</strong> {data.dateOfIssue}</p>
    <p><strong>Date of Expiry:</strong> {data.dateOfExpiry}</p>
  </div>
);

export default Card;
