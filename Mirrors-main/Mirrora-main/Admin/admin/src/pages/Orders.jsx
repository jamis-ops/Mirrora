import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import OrderStatus from "../components/OrderStatus.jsx";
import OrderDetailModal from "../components/OrderDetailModal.jsx";
import { Search, Filter, Eye } from "lucide-react";

// Initial orders data
const initialOrders = [
  // ... (data is the same as before)
  { id: "ORD-001", customer: { name: "Maria Santos", email: "maria.santos@email.com", }, product: "Classic Wall Mirror - Large", amount: "₱2,500", status: "pending", payment: "partial", date: "8/17/2024", time: "6:30:00 PM", quantity: 1, paymentMethod: "Bank Transfer", notes: "50% down payment received", },
  { id: "ORD-002", customer: { name: "Juan Dela Cruz", email: "juan.delacruz@email.com", }, product: "Decorative Vintage Mirror", amount: "₱6,400", status: "processing", payment: "paid", date: "8/16/2024", time: "3:45:00 PM", quantity: 2, paymentMethod: "GCash", notes: "Express delivery requested", },
  { id: "ORD-003", customer: { name: "Ana Rodriguez", email: "ana.rodriguez@email.com", }, product: "Modern Frameless Mirror", amount: "₱1,800", status: "shipped", payment: "pending", date: "8/15/2024", time: "11:20:00 AM", quantity: 1, paymentMethod: "Cash on Delivery", notes: "Customer requested special packaging", },
  { id: "ORD-004", customer: { name: "Carlos Lopez", email: "carlos.lopez@email.com", }, product: "Oval Bathroom Mirror Set", amount: "₱3,200", status: "delivered", payment: "paid", date: "8/17/2024", time: "9:15:00 AM", quantity: 1, paymentMethod: "Credit Card", notes: "Successfully delivered and installed", },
  { id: "ORD-005", customer: { name: "Lisa Chen", email: "lisa.chen@email.com", }, product: "Round Decorative Mirror", amount: "₱2,950", status: "confirmed", payment: "paid", date: "8/16/2024", time: "2:30:00 PM", quantity: 1, paymentMethod: "PayPal", notes: "Ready for processing", },
];

const getInitialData = (key, initialValue) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (error) {
    console.error("Error retrieving from local storage", error);
    return initialValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export default function Orders() {
  const [orders, setOrders] = useState(() =>
    getInitialData("orders", initialOrders)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    saveToLocalStorage("orders", orders);
  }, [orders]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const orderCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handleUpdatePaymentStatus = (orderId, newPaymentStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, payment: newPaymentStatus } : order
    );
    setOrders(updatedOrders);
  };

  const statusOptions = [
    "All Status",
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  return (
    // The main layout wrapper is now in AdminLayout.jsx
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header />
      <main
        style={{ flex: 1, padding: "0 24px 24px 24px", overflowY: "auto" }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#2C1810",
              fontFamily: "Inter, sans-serif",
              margin: 0,
              marginBottom: 8,
            }}
          >
            Orders
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#6b7280",
              fontFamily: "Inter, sans-serif",
              margin: 0,
            }}
          >
            Manage and track customer orders
          </p>
        </div>

        {/* Order Status Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <OrderStatus
            status="Pending"
            count={orderCounts.pending}
            onClick={() => setStatusFilter("Pending")}
            isActive={statusFilter === "Pending"}
          />
          <OrderStatus
            status="Processing"
            count={orderCounts.processing}
            onClick={() => setStatusFilter("Processing")}
            isActive={statusFilter === "Processing"}
          />
          <OrderStatus
            status="Shipped"
            count={orderCounts.shipped}
            onClick={() => setStatusFilter("Shipped")}
            isActive={statusFilter === "Shipped"}
          />
          <OrderStatus
            status="Delivered"
            count={orderCounts.delivered}
            onClick={() => setStatusFilter("Delivered")}
            isActive={statusFilter === "Delivered"}
          />
        </div>

        {/* Search and Filter Bar */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", flex: 1, maxWidth: "500px" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6b7280",
              }}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                padding: "0 16px 0 46px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#A67B5B")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={18} color="#6b7280" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                height: "44px",
                padding: "0 16px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                background: "#fff",
                cursor: "pointer",
                outline: "none",
                width: "150px",
                boxSizing: "border-box",
              }}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || statusFilter !== "All Status") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All Status");
              }}
              style={{
                height: "44px",
                padding: "0 20px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#f9fafb",
                color: "#6b7280",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.target.style.background = "#f9fafb")}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Orders Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 24px",
              borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#2C1810",
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              📦 Orders ({filteredOrders.length})
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
                marginLeft: 16,
              }}
            >
              Track and manage all customer orders
            </div>
          </div>

          {/* Table Header Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "120px 200px 250px 120px 120px 120px 120px 80px",
              gap: 16,
              padding: "16px 24px",
              borderBottom: "1px solid #e5e7eb",
              background: "#f8fafc",
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <div>Order ID</div>
            <div>Customer</div>
            <div>Product</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Payment</div>
            <div>Date</div>
            <div>Actions</div>
          </div>

          {/* Table Body */}
          {filteredOrders.length === 0 ? (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "#374151",
                }}
              >
                No orders found
              </h3>
              <p style={{ fontSize: 14 }}>
                {searchQuery || statusFilter !== "All Status"
                  ? "Try adjusting your search or filter criteria."
                  : "No orders have been placed yet."}
              </p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "120px 200px 250px 120px 120px 120px 120px 80px",
                  gap: 16,
                  padding: "16px 24px",
                  borderBottom:
                    index < filteredOrders.length - 1
                      ? "1px solid #e5e7eb"
                      : "none",
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  alignItems: "center",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div style={{ fontWeight: 600, color: "#2C1810" }}>
                  {order.id}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#2C1810",
                      marginBottom: 2,
                    }}
                  >
                    {order.customer.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {order.customer.email}
                  </div>
                </div>
                <div style={{ color: "#374151" }}>
                  <div style={{ fontWeight: 500, marginBottom: 2 }}>
                    {order.product}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Qty: {order.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: 600, color: "#2C1810" }}>
                  {order.amount}
                </div>
                <div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateOrderStatus(order.id, e.target.value)
                    }
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      fontSize: 12,
                      fontFamily: "Inter, sans-serif",
                      background: "#fff",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {statusOptions.slice(1).map((status) => (
                      <option
                        key={status.toLowerCase()}
                        value={status.toLowerCase()}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={order.payment}
                    onChange={(e) =>
                      handleUpdatePaymentStatus(order.id, e.target.value)
                    }
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      fontSize: 12,
                      fontFamily: "Inter, sans-serif",
                      background: "#fff",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div style={{ color: "#6b7280" }}>{order.date}</div>
                <div>
                  <button
                    onClick={() => handleViewOrder(order)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: 6,
                      border: "1px solid #d1d5db",
                      background: "#f9fafb",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#A67B5B";
                      e.target.style.borderColor = "#A67B5B";
                      e.target.querySelector("svg").style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#f9fafb";
                      e.target.style.borderColor = "#d1d5db";
                      e.target.querySelector("svg").style.color = "#6b7280";
                    }}
                  >
                    <Eye size={16} color="#6b7280" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={showOrderDetail}
          onClose={() => {
            setShowOrderDetail(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={handleUpdateOrderStatus}
          onUpdatePayment={handleUpdatePaymentStatus}
        />
      )}
    </div>
  );
}