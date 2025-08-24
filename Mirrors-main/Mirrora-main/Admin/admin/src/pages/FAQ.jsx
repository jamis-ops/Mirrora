// src/pages/FAQ.jsx

import React, { useState } from "react";
import { Plus, Trash, Pencil, ChevronDown, ChevronUp, X } from "lucide-react";

// Mock data for FAQs
const initialFAQs = [
  {
    id: 1,
    question: "What materials are your mirrors made of?",
    answer:
      "Our mirrors are crafted from high-quality, durable materials, including premium glass and sturdy frames made from sustainable wood or metal alloys. We ensure each piece meets our standards for clarity and longevity.",
  },
  {
    id: 2,
    question: "Do you offer custom sizing?",
    answer:
      "Yes, we provide custom sizing for select mirror designs. Please contact our customer service team with your specific dimensions and desired style, and we will provide you with a quote.",
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase for a full refund, provided the mirror is in its original condition and packaging. Please see our full return policy on our website for more details.",
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleEditClick = (faq) => {
    setCurrentFAQ({ ...faq });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentFAQ({ ...currentFAQ, [name]: value });
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewFAQ({ ...newFAQ, [name]: value });
  };

  const handleUpdate = () => {
    setFaqs(faqs.map((f) => (f.id === currentFAQ.id ? currentFAQ : f)));
    setIsEditModalOpen(false);
    setCurrentFAQ(null);
  };

  const handleCreate = () => {
    const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
    setFaqs([...faqs, { ...newFAQ, id: newId }]);
    setIsAddModalOpen(false);
    setNewFAQ({ question: "", answer: "" });
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

  const faqItemStyle = {
    background: "#F9FAFB",
    padding: 16,
    borderRadius: 8,
    border: "1px solid #E5E5E5",
  };

  const faqHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
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
    maxWidth: 600,
    maxHeight: "90vh",
    overflowY: "auto",
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
            Manage FAQ
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#6b7280",
              fontFamily: "sans-serif",
            }}
          >
            Add, edit, and organize your frequently asked questions
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
          <Plus size={16} /> Add FAQ
        </button>
      </header>

      <div style={cardStyle}>
        {faqs.map((faq) => (
          <div key={faq.id} style={faqItemStyle}>
            <div
              style={faqHeaderStyle}
              onClick={() => toggleFAQ(faq.id)}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#2C1810",
                }}
              >
                {faq.question}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(faq);
                  }}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    background: "#E5E5E5",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Pencil size={16} color="#7A6C5D" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(faq.id);
                  }}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    background: "#E5E5E5",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash size={16} color="#D2B48C" />
                </button>
                {openFAQ === faq.id ? (
                  <ChevronUp size={20} color="#7A6C5D" />
                ) : (
                  <ChevronDown size={20} color="#7A6C5D" />
                )}
              </div>
            </div>
            {openFAQ === faq.id && (
              <p
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Edit FAQ Modal */}
      {isEditModalOpen && currentFAQ && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C1810" }}>Edit FAQ</h2>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#6B7280" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Question</label>
                <textarea
                  name="question"
                  value={currentFAQ.question}
                  onChange={handleEditChange}
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Answer</label>
                <textarea
                  name="answer"
                  value={currentFAQ.answer}
                  onChange={handleEditChange}
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
              <button onClick={() => setIsEditModalOpen(false)} style={secondaryButtonStyle}>Cancel</button>
              <button onClick={handleUpdate} style={primaryButtonStyle}>Update FAQ</button>
            </div>
          </div>
        </div>
      )}

      {/* Create New FAQ Modal */}
      {isAddModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C1810" }}>Create New FAQ</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} color="#6B7280" />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Question</label>
                <textarea
                  name="question"
                  value={newFAQ.question}
                  onChange={handleNewChange}
                  placeholder="Enter the question"
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#2C1810", marginBottom: 8, display: "block" }}>Answer</label>
                <textarea
                  name="answer"
                  value={newFAQ.answer}
                  onChange={handleNewChange}
                  placeholder="Enter the answer"
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
              <button onClick={() => setIsAddModalOpen(false)} style={secondaryButtonStyle}>Cancel</button>
              <button onClick={handleCreate} style={primaryButtonStyle}>Create FAQ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}