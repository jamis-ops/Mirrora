import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Header from "../components/Header.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { Plus, X, Pencil, Trash } from "lucide-react";

// This is the initial set of categories.
const initialCategories = ["Wall Mirrors", "Decorative Mirrors", "Bathroom Mirrors"];

const initialProducts = [
  {
    id: 1,
    name: "Oval Wall Mirror",
    category: "Wall Mirrors",
    inventory: 50,
    price: "₱2,450",
    imageUrl: "https://placehold.co/280x180/8B5E3C/FFFFFF?text=Oval+Mirror",
  },
  {
    id: 2,
    name: "Decorative Round Mirror",
    category: "Decorative Mirrors",
    inventory: 23,
    price: "₱3,200",
    imageUrl: "https://placehold.co/280x128/A67B5B/FFFFFF?text=Round+Mirror",
  },
  {
    id: 3,
    name: "Large Rectangle Mirror",
    category: "Wall Mirrors",
    inventory: 15,
    price: "₱4,800",
    imageUrl: "https://placehold.co/280x180/784E39/FFFFFF?text=Rectangle+Mirror",
  },
  {
    id: 4,
    name: "Vintage Frame Mirror",
    category: "Decorative Mirrors",
    inventory: 8,
    price: "₱3,750",
    imageUrl: "https://placehold.co/280x180/D5A18C/FFFFFF?text=Vintage+Mirror",
  },
  {
    id: 5,
    name: "Round Bathroom Mirror",
    category: "Bathroom Mirrors",
    inventory: 35,
    price: "₱1,900",
    imageUrl: "https://placehold.co/280x180/B07A65/FFFFFF?text=Bathroom+Mirror",
  },
  {
    id: 6,
    name: "Frameless Bathroom Mirror",
    category: "Bathroom Mirrors",
    inventory: 40,
    price: "₱1,500",
    imageUrl: "https://placehold.co/280x180/9C5B42/FFFFFF?text=Frameless+Mirror",
  },
];

// Helper function to get data from local storage or use initial data
const getInitialData = (key, initialValue) => {
  try {
    // Attempt to get the stored value from local storage.
    const storedValue = window.localStorage.getItem(key);
    // If a value exists, parse and return it.
    // Otherwise, return the initial value provided.
    return storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (error) {
    // If an error occurs (e.g., localStorage is not available),
    // log the error and return the initial value.
    console.error("Error retrieving from local storage", error);
    return initialValue;
  }
};

// Helper function to save data to local storage
const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export default function Products() {
  // Use a function to set the initial state from localStorage.
  // This function will only run once when the component mounts.
  const [products, setProducts] = useState(() => getInitialData('products', initialProducts));
  const [categories, setCategories] = useState(() => getInitialData('categories', initialCategories));
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Use useEffect to save data to localStorage whenever products or categories change.
  // This is the correct pattern. When `products` state changes, this effect runs
  // and saves the new data to local storage.
  useEffect(() => {
    saveToLocalStorage('products', products);
  }, [products]);

  // Same as above, for categories.
  useEffect(() => {
    saveToLocalStorage('categories', categories);
  }, [categories]);

  // The rest of your functions are fine as they are.
  // The state updates (`setProducts` and `setCategories`) will automatically trigger the useEffect hooks.
  const handleAddProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const updatedProducts = [...products, { ...newProduct, id: newId }];
    setProducts(updatedProducts);
    setShowProductForm(false);
    setEditingProduct(null);
    setSelectedCategory(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updatedProducts);
    setEditingProduct(null);
    setShowProductForm(false);
    setSelectedCategory(null);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
      setProducts(updatedProducts);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const openAddProductForm = (category) => {
    setEditingProduct(null);
    setSelectedCategory(category);
    setShowProductForm(true);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setCategoryToDelete(null);
    setShowDeleteModal(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setSelectedCategory(product.category);
    setShowProductForm(true);
  };

  const handleView = (product) => {
    console.log("Viewing product:", product.name);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = newCategoryName.trim();
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategoryName("");
      setShowAddCategoryForm(false);
    }
  };

  const openEditCategoryModal = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
    setShowEditCategoryModal(true);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    const updatedCategory = newCategoryName.trim();
    if (updatedCategory && updatedCategory !== editingCategory) {
      const newCategories = categories.map(c => c === editingCategory ? updatedCategory : c);
      setCategories(newCategories);

      const newProducts = products.map(p => p.category === editingCategory ? { ...p, category: updatedCategory } : p);
      setProducts(newProducts);
    }
    setShowEditCategoryModal(false);
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const openDeleteCategoryModal = (category) => {
    setCategoryToDelete(category);
    setProductToDelete(null);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      const updatedCategories = categories.filter(c => c !== categoryToDelete);
      setCategories(updatedCategories);

      const updatedProducts = products.filter(p => p.category !== categoryToDelete);
      setProducts(updatedProducts);

      setCategoryToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});

  const allCategories = [...new Set([...categories, ...Object.keys(groupedProducts)])];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <AdminSidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Header />
        <main style={{ flex: 1, padding: "0 24px 24px 24px", overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#2C1810",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Product Management
            </h1>
            <button
              onClick={() => {
                setEditingProduct(null);
                setSelectedCategory(null);
                setShowProductForm(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#A67B5B",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>

          {/* Category Management Section */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C1810", fontFamily: "Inter, sans-serif" }}>
                Categories
              </h2>
              <button
                onClick={() => setShowAddCategoryForm(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#D2B48C",
                  color: "#2C1810",
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Plus size={16} />
                Add Category
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {categories.map((category) => (
                <div key={category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    background: "#EFEFEF",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#2C1810",
                    fontFamily: "Inter, sans-serif",
                  }}>
                  <span>{category}</span>
                  <button onClick={() => openEditCategoryModal(category)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Pencil size={14} color="#6b7280" />
                  </button>
                  <button onClick={() => openDeleteCategoryModal(category)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Trash size={14} color="#EF4444" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* End of Category Management Section */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0' }} />

          {allCategories.map((category) => (
            <div key={category} style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  marginBottom: 16,
                  color: "#2C1810",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {category}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                {(groupedProducts[category] || []).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={openEditForm}
                    onDelete={openDeleteModal}
                    onView={handleView}
                  />
                ))}
                <button
                  onClick={() => openAddProductForm(category)}
                  style={{
                    width: "100%",
                    maxWidth: "280px",
                    height: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f3f4f6",
                    border: "2px dashed #d1d5db",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "border-color 0.2s, background-color 0.2s",
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#A67B5B";
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                >
                  <Plus size={32} />
                  Add Product
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Add/Edit Product Modal */}
        {showProductForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 12,
                minWidth: 400,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, fontFamily: "Inter, sans-serif" }}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const newProduct = {
                    id: editingProduct ? editingProduct.id : products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                    name: form.name.value,
                    category: form.category.value,
                    inventory: parseInt(form.inventory.value, 10),
                    price: form.price.value,
                    imageUrl: form.imageUrl.value,
                  };
                  if (editingProduct) {
                    handleUpdateProduct(newProduct);
                  } else {
                    handleAddProduct(newProduct);
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  defaultValue={editingProduct?.name || ""}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <select
                  name="category"
                  defaultValue={editingProduct?.category || selectedCategory || ""}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="inventory"
                  placeholder="Inventory Count"
                  defaultValue={editingProduct?.inventory || ""}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price (e.g., ₱2,500)"
                  defaultValue={editingProduct?.price || ""}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <label style={{ color: "#6b7280", fontSize: 14 }}>Product Image:</label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const imageURL = reader.result;
                        document.querySelector('input[name="imageUrl"]').value = imageURL;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <input
                  type="hidden"
                  name="imageUrl"
                  defaultValue={editingProduct?.imageUrl || ""}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                      setSelectedCategory(null);
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#e5e7eb",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#A67B5B",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddCategoryForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 12,
                minWidth: 400,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>Add New Category</h3>
                <button
                  onClick={() => setShowAddCategoryForm(false)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
              <form onSubmit={handleAddCategory} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategoryForm(false);
                      setNewCategoryName("");
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#e5e7eb",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#A67B5B",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {showEditCategoryModal && editingCategory && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 40,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 12,
                minWidth: 400,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>Edit Category</h3>
                <button
                  onClick={() => setShowEditCategoryModal(false)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
              <form onSubmit={handleEditCategory} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditCategoryModal(false);
                      setNewCategoryName("");
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#e5e7eb",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#A67B5B",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontamily: "Inter, sans-serif",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal for Products and Categories */}
        {showDeleteModal && (productToDelete || categoryToDelete) && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 30,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 12,
                minWidth: 400,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>Confirm Deletion</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              </div>
              {productToDelete && (
                <p style={{ color: "#4B5563" }}>
                  Are you sure you want to delete the product <span style={{ fontWeight: "bold" }}>"{productToDelete.name}"</span>? This action cannot be undone.
                </p>
              )}
              {categoryToDelete && (
                <p style={{ color: "#4B5563" }}>
                  Are you sure you want to delete the category <span style={{ fontWeight: "bold" }}>"{categoryToDelete}"</span>? This will also delete all products under this category. This action cannot be undone.
                </p>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: "#e5e7eb",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (productToDelete) {
                      handleDeleteProduct();
                    } else if (categoryToDelete) {
                      handleDeleteCategory();
                    }
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: "#EF4444",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}