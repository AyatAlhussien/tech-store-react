import { useState } from "react";
import { products as initialProducts } from "../data/products";
import AdminSidebar from "../components/layout/AdminSidebar";
import { orders as initialOrders } from "../data/orders";

function Admin() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Computers",
    price: "",
    stockQuantity: "",
  });

  const [categories, setCategories] = useState([
    "Computers",
    "Audio",
    "Wearables",
    "Accessories",
    "Mobile",
  ]);

 const [orders, setOrders] = useState(initialOrders);

  const [newCategory, setNewCategory] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleProduct(id) {
    const product = products.find((item) => item.id === id);

    if (product.isActive !== false) {
      const confirmed = window.confirm(
        "Are you sure you want to deactivate this product?"
      );

      if (!confirmed) return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              isActive: product.isActive === false,
            }
          : product
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingId
            ? {
                ...product,
                name: newProduct.name,
                category: newProduct.category,
                price: Number(newProduct.price),
                stockQuantity: Number(newProduct.stockQuantity),
              }
            : product
        )
      );
    } else {
      const product = {
        id:
          products.length > 0
            ? Math.max(...products.map((p) => p.id)) + 1
            : 1,
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stockQuantity: Number(newProduct.stockQuantity),
        image: "/images/product.png",
        isActive: true,
      };

      setProducts([...products, product]);
    }

    setNewProduct({
      name: "",
      category: "Computers",
      price: "",
      stockQuantity: "",
    });

    setEditingId(null);
    setShowAddForm(false);
  }

  function editProduct(product) {
    setEditingId(product.id);

    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });

    setShowAddForm(true);
  }

  function cancelForm() {
    setEditingId(null);

    setNewProduct({
      name: "",
      category: "Computers",
      price: "",
      stockQuantity: "",
    });

    setShowAddForm(false);
  }

  function addCategory(e) {
    e.preventDefault();

    const categoryName = newCategory.trim();

    if (!categoryName) return;

    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }

    setNewCategory("");
  }

  function updateOrderStatus(id, status) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <section className="admin-page" id="dashboard">
        <h1>Admin Dashboard</h1>

        <div className="admin-stats">
          <div>
            <h2>{products.length}</h2>
            <p>Products</p>
          </div>

          <div>
            <h2>{categories.length}</h2>
            <p>Categories</p>
          </div>

          <div>
            <h2>{orders.length}</h2>
            <p>Orders</p>
          </div>

          <div>
            <h2>$8,450</h2>
            <p>Total Sales</p>
          </div>
        </div>

        <div className="admin-products" id="products">
          <h2>Products Management</h2>

          <input
            className="admin-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="admin-add-product">
            <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

            <button
              onClick={() => {
                if (showAddForm) {
                  cancelForm();
                } else {
                  setShowAddForm(true);
                }
              }}
            >
              {showAddForm ? "Cancel" : "+ Add Product"}
            </button>
          </div>

          {showAddForm && (
            <form
              className="admin-product-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Product Name"
                required
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
              >
                {categories.map((category) => (
                  <option key={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Price"
                min="1"
                required
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Stock"
                min="0"
                required
                value={newProduct.stockQuantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stockQuantity: e.target.value,
                  })
                }
              />

              <button type="submit">
                {editingId
                  ? "Save Changes"
                  : "Save Product"}
              </button>
            </form>
          )}

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stockQuantity}</td>

                    <td>
                      {product.isActive === false
                        ? "Inactive"
                        : "Active"}
                    </td>

                    <td className="admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          editProduct(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className={
                          product.isActive === false
                            ? "activate-btn"
                            : "deactivate-btn"
                        }
                        onClick={() =>
                          toggleProduct(product.id)
                        }
                      >
                        {product.isActive === false
                          ? "Activate"
                          : "Deactivate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="admin-products"
          id="categories"
        >
          <h2>Categories Management</h2>

          <form
            className="category-form"
            onSubmit={addCategory}
          >
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value)
              }
            />

            <button type="submit">
              Add Category
            </button>
          </form>

          <div className="category-list">
            {categories.map((category) => (
              <div
                key={category}
                className="category-item"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div
          className="admin-products"
          id="orders"
        >
          <h2>Orders Management</h2>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.total}</td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;