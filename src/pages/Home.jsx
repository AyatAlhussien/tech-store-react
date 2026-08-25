import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ProductCard from "../components/products/ProductCard";
import CategoryCard from "../components/products/CategoryCard";
import { products } from "../data/products";

function Home() {
  const navigate = useNavigate();
const [search, setSearch] = useState("");

function handleSearch(e) {
  e.preventDefault();

  if (!search.trim()) return;

  navigate(`/products?search=${encodeURIComponent(search.trim())}`);
}
  const categories = [
    "Computers",
    "Audio",
    "Wearables",
    "Accessories",
    "Mobile",
  ];

  const featuredProducts = products.slice(0, 4);
  const latestProducts = products.slice(-4);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Everything Tech, One Store</h1>

          <p>
            Discover computers, accessories, audio devices and more.
          </p>
          <form className="home-search" onSubmit={handleSearch}>
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button type="submit">
    Search
  </button>
</form>

          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="home-products">
        <h2>Shop by Category</h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
            />
          ))}
        </div>
      </section>

      <section className="home-products">
        <h2>Featured Products</h2>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <h2>Upgrade Your Tech</h2>
        <p>Discover our latest technology products and accessories.</p>

        <Link to="/products">
          <button>Explore Products</button>
        </Link>
      </section>

      <section className="home-products">
        <h2>Latest Products</h2>

        <div className="products-grid">
          {latestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;