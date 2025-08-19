import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        background: "#F5F5DC",
        fontFamily: "sans-serif",
      }}
    >
      <div>
        <h1 style={{ fontSize: 32, marginBottom: 8, color: "#2C1810" }}>
          404 – Page Not Found
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 16 }}>
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            background: "#A67B5B",
            padding: "10px 20px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Go back to Dashboard
        </Link>
      </div>
    </div>
  );
}