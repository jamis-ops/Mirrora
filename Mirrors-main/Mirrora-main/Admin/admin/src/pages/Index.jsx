import React, { useState } from "react";
// Removed import of AdminSidebar. It's now in the layout.
import DashboardCard from "../components/DashboardCard.jsx";
import OrderStatus from "../components/OrderStatus.jsx";
import Header from "../components/Header.jsx";
import NotificationsList from "../components/NotificationsList.jsx";
import {
  Package,
  ShoppingCart,
  LineChart,
  User,
} from "lucide-react";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Maria Santos",
    product: "Oval Wall Mirror",
    price: "₱2,450",
    status: "pending",
  },
  {
    id: "ORD-002",
    customer: "Juan Dela Cruz",
    product: "Decorative Round Mirror",
    price: "₱3,200",
    status: "confirmed",
  },
  {
    id: "ORD-003",
    customer: "Ana Reyes",
    product: "Large Rectangle Mirror",
    price: "₱4,800",
    status: "processing",
  },
  {
    id: "ORD-004",
    customer: "Carlos Lopez",
    product: "Vintage Frame Mirror",
    price: "₱3,750",
    status: "shipped",
  },
];

export default function Index() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    // The main layout wrapper is now in AdminLayout.jsx
    <div style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
      <Header onBellClick={togglePanel} />
      <main style={{ flex: 1, padding: "0 24px 24px 24px", overflowY: "auto" }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 4,
            color: "#2C1810",
            fontFamily: "sans-serif",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, fontFamily: "sans-serif" }}>
          Welcome back! Here's what's happening with your mirror business today.
        </p>

        {/* Dashboard Cards Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <DashboardCard
            title="Total Products"
            value="248"
            description="+12% from last month"
            icon={Package}
          />
          <DashboardCard
            title="Orders Today"
            value="23"
            description="+8% from last month"
            icon={ShoppingCart}
          />
          <DashboardCard
            title="Revenue"
            value="₱45,680"
            description="+23% from last month"
            icon={LineChart}
          />
          <DashboardCard
            title="Active Customers"
            value="156"
            description="+5% from last month"
            icon={User}
          />
        </div>

        {/* Recent Orders Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 16,
              color: "#2C1810",
              fontFamily: "sans-serif",
            }}
          >
            Recent Orders
          </h2>
          <div style={{ display: "grid", gap: 8 }}>
            {recentOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, fontFamily: "sans-serif" }}>
                      {order.id}
                    </div>
                    <div style={{ fontSize: 14, color: "#6b7280", fontFamily: "sans-serif" }}>
                      {order.customer}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#2C1810", fontFamily: "sans-serif" }}>
                    {order.product}
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 24 }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: "sans-serif" }}>
                    {order.price}
                  </div>
                  <OrderStatus status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 300,
          height: "100%",
          background: "#f9fafb",
          borderLeft: "1px solid #e5e7eb",
          transform: `translateX(${isPanelOpen ? "0" : "100%"})`,
          transition: "transform 0.3s ease-in-out",
          zIndex: 10,
        }}
      >
        <NotificationsList onClose={togglePanel} />
      </div>
    </div>
  );
}