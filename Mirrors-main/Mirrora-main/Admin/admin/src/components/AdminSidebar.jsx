import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Circle,
  Image, // New icon for banners
  HelpCircle, // New icon for FAQ
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Banners", href: "/banners", icon: Image },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AdminSidebar() {
  const activeLinkStyle = {
    background: "#A67B5B",
    color: "#fff",
  };

  const nonActiveLinkStyle = {
    background: "transparent",
    color: "#2C1810",
  };

  return (
    <aside
      style={{
        width: 256,
        minHeight: "100vh",
        background: "#F8F5F0",
        display: "flex",
        flexDirection: "column",
        padding: "20px 16px",
        boxSizing: "border-box",
        borderRight: "1px solid #EAE3D9",
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#8B5E3C",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Circle size={18} color="#fff" />
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              color: "#2C1810",
              fontSize: 18,
              fontFamily: "sans-serif",
            }}
          >
            Mirrora
          </div>
          <div
            style={{ fontSize: 12, color: "#7A6C5D", fontFamily: "sans-serif" }}
          >
            Admin Panel
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
              fontSize: 14,
              color: isActive ? activeLinkStyle.color : nonActiveLinkStyle.color,
              background: isActive ? activeLinkStyle.background : nonActiveLinkStyle.background,
              marginBottom: 8,
              transition: "all 0.2s ease",
              fontFamily: "sans-serif",
            })}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D2B48C";
              e.currentTarget.style.color = "#2C1810";
            }}
            onMouseLeave={(e) => {
              const isActive = e.currentTarget.classList.contains("active");
              e.currentTarget.style.background = isActive
                ? activeLinkStyle.background
                : nonActiveLinkStyle.background;
              e.currentTarget.style.color = isActive
                ? activeLinkStyle.color
                : nonActiveLinkStyle.color;
            }}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Profile Section */}
      <div
        style={{
          paddingTop: 16,
          borderTop: "1px solid #E5E5E5",
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: "auto",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: "#8B5E3C",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          A
        </div>
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#2C1810",
              fontFamily: "sans-serif",
            }}
          >
            Admin
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#7A6C5D",
              fontFamily: "sans-serif",
            }}
          >
            Mirrora Philippines
          </p>
        </div>
      </div>
    </aside>
  );
}