import { useState } from "react";
import { useParams, Link } from "react-router";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/products/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <section className="product-details-page">
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  const similarProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 3);

  function handleQuantityChange(e) {
    let value = Number(e.target.value);

    if (value < 1) {
      value = 1;
    }

    if (value > product.stockQuantity) {
      value = product.stockQuantity;
      setMessage("Quantity cannot exceed available stock");
    } else {
      setMessage("");
    }

    setQuantity(value);
  }

  function handleAddToCart() {
    if (product.stockQuantity === 0) {
      return;
    }

    addToCart(product, quantity);
    setMessage("Product added to cart successfully");
  }

  function getStockStatus() {
    if (product.stockQuantity === 0) {
      return (
        <p className="out-stock">
          Out of Stock
        </p>
      );
    }

    if (product.stockQuantity <= 5) {
      return (
        <p className="limited-stock">
          Limited Stock: {product.stockQuantity}
        </p>
      );
    }

    return (
      <p className="in-stock">
        In Stock: {product.stockQuantity}
      </p>
    );
  }

  return (
    <section className="product-details-page">

      <div className="product-details-card">

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <h2>${product.price}</h2>

          <p>
            A high-quality technology product designed
            for everyday use.
          </p>

          {getStockStatus()}

          <label htmlFor="quantity">
            Quantity
          </label>

          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stockQuantity}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={product.stockQuantity === 0}
          />

          <button
            disabled={product.stockQuantity === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {message && (
            <p className="product-message">
              {message}
            </p>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h2>Similar Products</h2>

          <div className="products-grid">
            {similarProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;