import { Link } from "react-router";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category}`}
      className="category-card"
    >
      <h3>{category}</h3>
      <p>Browse Products</p>
    </Link>
  );
}

export default CategoryCard;