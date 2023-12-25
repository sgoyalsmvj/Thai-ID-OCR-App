

import React from "react";

const Field = ({ label, value }) => (
  <div style={{ marginBottom: "8px" }}>
    <strong>{label}:</strong> {value}
  </div>
);

export default Field;
