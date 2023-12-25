// frontend/src/components/Card.js
import React from "react";
import Field from "./Field";

const Card = ({ card, onEdit, onDelete }) => (
  <div style={{ border: "1px solid #ddd", padding: "16px", margin: "16px", width: "300px" }}>
    <Field label="Name" value={card.name} />
    <Field label="Last Name" value={card.lastName} />
    <Field label="Date of Birth" value={card.dateOfBirth} />
    <Field label="Identification Number" value={card.identificationNumber} />
    <Field label="Date of Issue" value={card.dateOfIssue} />
    <Field label="Date of Expiry" value={card.dateOfExpiry} />
    <button onClick={() => onEdit(card)}>Edit</button>
    <button onClick={() => onDelete(card.identificationNumber)}>Delete</button>
  </div>
);

export default Card;
