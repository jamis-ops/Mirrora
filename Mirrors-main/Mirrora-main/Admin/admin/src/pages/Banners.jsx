// src/pages/Banners.jsx

import React, { useState } from "react";
import { Plus, Trash, Eye, EyeOff, Pencil, X } from "lucide-react";

// Mock data to simulate banners
const initialBanners = [
  {
    id: 1,
    title: "Premium Mirror Collection",
    subtitle: "Discover our handcrafted mirrors with elegant frames",
    // This is a placeholder. In a real app, this would be a URL to the saved image.
    image: "/src/assets/banner1.jpg", 
    link: "/products/mirrors",
    active: true,
  },
  {
    id: 2,
    title: "Summer Sale - 30% Off",
    subtitle: "Limited time offer on all decorative mirrors",
    image: "/src/assets/banner2.jpg",
    link: "/sale",
    active: true,
  },
  {
    id: 3,
    title: "Custom Mirror Solutions",
    subtitle: "Get personalized mirrors for your space",
    image: "/src/assets/banner3.jpg",
    link: "/custom",
    active: false,
  },
];

export default function Banners() {
  const [banners, setBanners] = useState(initialBanners);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    image: null,
    link: "",
    active: true,
  });

  const handleEditClick = (banner) => {
    setCurrentBanner({ ...banner });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const handleToggleActive = (id) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, active: !b.active } : b
      )
    );
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentBanner({
      ...currentBanner,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBanner({
      ...newBanner,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = () => {
    setBanners(
      banners.map((b) => (b.id === currentBanner.id ? currentBanner : b))
    );
    setIsEditModalOpen(false);
    setCurrentBanner(null);
  };

  const handleCreate = () => {
    const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
    setBanners([...banners, { ...newBanner, id: newId }]);
    setIsAddModalOpen(false);
    setNewBanner({
      title: "",
      subtitle: "",
      image: null,
      link: "",
      active: true,
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected file to be used as a source for the <img> tag
      const imageUrl = URL.createObjectURL(file);
      if (type === "new") {
        setNewBanner({ ...newBanner, image: imageUrl });
      } else {
        setCurrentBanner({ ...currentBanner, image: imageUrl });
      }
    }
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

  const bannerItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    transition: "background 0.2s ease",
    position: "relative",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  };

  const modalContentStyle = {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: 500,
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontFamily: "sans-serif",
    fontSize: 14,
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "#A67B5B",
    color: "#fff",
    border: "none",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "transparent",
    color: "#7A6C5D",
    border: "1px solid #7A6C5D",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 24,
        background: "#f9fafb",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#2C1810",
              fontFamily: "sans-serif",
            }}
          >
            Homepage Banners
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#6b7280",
              fontFamily: "sans-serif",
            }}
          >
            Manage your homepage banner carousel
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            ...primaryButtonStyle,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Plus size={16} /> Add Banner
        </button>
      </header>

      <div style={cardStyle}>
        {banners.map((banner) => (
          <div key={banner.id} style={bannerItemStyle}>
            <div
              style={{
                width: 120,
                height: 80,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #E5E5E5"
              }}
            >
              {banner.image && (
                <img
                  src={banner.image}
                  alt={banner.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                flex: 1,
                marginLeft: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#2C1810",
                  }}
                >
                  {banner.title}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: 9999,
                    color: banner.active ? "#8B5E3C" : "#7A6C5D",
                    background: banner.active ? "#F8E9DA" : "#E5E5E5",
                  }}
                >
                  {banner.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div
                style={{ fontSize: 14, color: "#6b7280" }}
              >
                {banner.subtitle}
              </div>
              <div
                style={{ fontSize: 12, color: "#9CA3AF" }}
              >
                Links to: <span style={{ color: "#7A6C5D" }}>{banner.link}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <button
                onClick={() => handleToggleActive(banner.id)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "#F5F5F5",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {banner.active ? <Eye size={18} color="#7A6C5D" /> : <EyeOff size={18} color="#7A6C5D" />}
              </button>
              <button
                onClick={() => handleEditClick(banner)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "#F5F5F5",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Pencil size={18} color="#7A6C5D" />
              </button>
              <button
                onClick={() => handleDeleteClick(banner.id)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: "#F5F5F5",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash size={18} color="#D2B48C" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Banner Modal */}
      {isEditModalOpen && currentBanner && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C1810" }}>Edit Banner</h2>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#6B7280" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentBanner.title}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Subtitle</label>
                <textarea
                  name="subtitle"
                  value={currentBanner.subtitle}
                  onChange={handleEditChange}
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Image (Upload File)</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "edit")}
                  style={{ ...inputStyle, border: "1px dashed #ccc", cursor: "pointer" }}
                />
                {currentBanner.image && (
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 12, color: "#7A6C5D" }}>Current image:</p>
                    <img
                      src={currentBanner.image}
                      alt="Current Banner"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        marginTop: 4,
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Link URL</label>
                <input
                  type="text"
                  name="link"
                  value={currentBanner.link}
                  onChange={handleEditChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={currentBanner.active}
                  onChange={handleEditChange}
                  style={{ transform: "scale(1.2)" }}
                />
                <label style={{ fontSize: 14, color: "#2C1810" }}>Active (show on homepage)</label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
              <button onClick={() => setIsEditModalOpen(false)} style={secondaryButtonStyle}>Cancel</button>
              <button onClick={handleUpdate} style={primaryButtonStyle}>Update Banner</button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Banner Modal */}
      {isAddModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C1810" }}>Create New Banner</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#6B7280" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newBanner.title}
                  onChange={handleNewChange}
                  placeholder="Enter banner title"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Subtitle</label>
                <textarea
                  name="subtitle"
                  value={newBanner.subtitle}
                  onChange={handleNewChange}
                  placeholder="Enter banner subtitle"
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Image (Upload File)</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "new")}
                  style={{ ...inputStyle, border: "1px dashed #ccc", cursor: "pointer" }}
                />
                {newBanner.image && (
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 12, color: "#7A6C5D" }}>Preview:</p>
                    <img
                      src={newBanner.image}
                      alt="New Banner Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        marginTop: 4,
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Link URL</label>
                <input
                  type="text"
                  name="link"
                  value={newBanner.link}
                  onChange={handleNewChange}
                  placeholder="/products or https://example.com"
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={newBanner.active}
                  onChange={handleNewChange}
                  style={{ transform: "scale(1.2)" }}
                />
                <label style={{ fontSize: 14, color: "#2C1810" }}>Active (show on homepage)</label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
              <button onClick={() => setIsAddModalOpen(false)} style={secondaryButtonStyle}>Cancel</button>
              <button onClick={handleCreate} style={primaryButtonStyle}>Create Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}