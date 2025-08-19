import React from "react";
import { Pencil, Trash } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
  const stockStatus = product.inventory > 0 ? "In Stock" : "Out of Stock";
  const stockColor = product.inventory > 0 ? "#059669" : "#DC2626";
  const stockBackgroundColor = product.inventory > 0 ? "#D1FAE5" : "#FEE2E2";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "280px",
        minWidth: "250px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 250, // Increased height to make the card taller
          overflow: "hidden",
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} // `objectFit: "cover"` ensures the image fills the container without distortion
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/280x250/e5e7eb/6b7280?text=No+Image"; // Updated fallback image dimensions
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "4px 8px",
            background: stockBackgroundColor,
            color: stockColor,
            borderRadius: 9999,
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          {stockStatus}
        </span>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2C1810", lineHeight: 1.2, margin: 0 }}>
            {product.name}
          </h3>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#2C1810", margin: 0 }}>
            {product.price}
          </p>
          <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
            Stock: {product.inventory}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          padding: "12px 16px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <button
          onClick={() => onEdit(product)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 16px",
            background: "#D2B48C",
            color: "#2C1810",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4A27E")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D2B48C")}
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 16px",
            background: "#EF4444",
            color: "#fff",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
        >
          <Trash size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}