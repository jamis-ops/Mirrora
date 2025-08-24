import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import Settings from "./pages/Settings.jsx";
import Banners from "./pages/Banners.jsx";
import FAQ from "./pages/FAQ.jsx";
import { ProductsProvider } from "./Context/ProductsContext.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
}