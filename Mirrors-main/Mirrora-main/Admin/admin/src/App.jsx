// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index.jsx";
import Users from "./pages/Users.jsx";
import Products from "./pages/Products.jsx";
import Settings from "./pages/Settings.jsx";
import NotFoundPage from "./pages/Notfound.jsx";
import { ProductsProvider } from "./Context/ProductsContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider> {/* ✅ wrap here */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
}
