import React from "react"
import AdminSidebar from "../components/AdminSidebar.jsx"

export default function Users() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "sans-serif" }}>Users</h1>
        <p style={{ fontFamily: "sans-serif" }}>Manage users here.</p>
      </main>
    </div>
  )
}