import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <strong>${product.price}</strong>

      <Link to={`/products/${product.id}`}>
        <button>View Product</button>
      </Link>
    </div>
  );
}

export default ProductCard;