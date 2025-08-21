import React from "react";
import "./Users.css";

export default function Users() {
  return (
    <div className="users-container">
      <h2>User Management</h2>
      <p>This is a test - Users component is working!</p>
      <div style={{ padding: "2rem", background: "white", borderRadius: "8px" }}>
        <h3>Simple Test Component</h3>
        <p>If you can see this, the Users component is loading correctly.</p>
        <button 
          onClick={() => alert("Users component is working!")}
          style={{ 
            padding: "0.5rem 1rem", 
            background: "#3498db", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}