import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { products } from "../data/products";
import ProductCard from "../components/products/ProductCard";

function Products() {
  const [searchParams] = useSearchParams();
const searchFromUrl =
  searchParams.get("search") || "";
const categoryFromUrl =
  searchParams.get("category") || "All";
  const [search, setSearch] = useState(searchFromUrl);
  const [category, setCategory] = useState(categoryFromUrl);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("All");
  const [stock, setStock] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!Array.isArray(products)) {
          throw new Error();
        }

        setLoading(false);
      } catch {
        setError("Failed to load products");
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    let matchesPrice = true;

    if (priceRange === "under50") {
      matchesPrice = product.price < 50;
    }

    if (priceRange === "50to100") {
      matchesPrice =
        product.price >= 50 &&
        product.price <= 100;
    }

    if (priceRange === "over100") {
      matchesPrice = product.price > 100;
    }

    let matchesStock = true;

    if (stock === "available") {
      matchesStock = product.stockQuantity > 0;
    }

    if (stock === "out") {
      matchesStock = product.stockQuantity === 0;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesStock
    );
  });

  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("");
    setPriceRange("All");
    setStock("All");
    setVisibleCount(8);
  }

  if (loading) {
    return (
      <section className="products-page">
        <h1>Products</h1>

        <div className="status-box">
          Loading products...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-page">
        <h1>Products</h1>

        <div className="status-box error-box">
          <p>{error}</p>

          <button
            onClick={() => {
              setError("");
              setLoading(true);

              setTimeout(() => {
                setLoading(false);
              }, 800);
            }}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="products-page">
      <h1>Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(8);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisibleCount(8);
          }}
        >
          <option value="All">All Categories</option>
          <option value="Computers">Computers</option>
          <option value="Audio">Audio</option>
          <option value="Wearables">Wearables</option>
          <option value="Accessories">Accessories</option>
          <option value="Mobile">Mobile</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
            setVisibleCount(8);
          }}
        >
          <option value="All">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Over $100</option>
        </select>

        <select
          value={stock}
          onChange={(e) => {
            setStock(e.target.value);
            setVisibleCount(8);
          }}
        >
          <option value="All">All Stock</option>
          <option value="available">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="low">
            Price: Low to High
          </option>
          <option value="high">
            Price: High to Low
          </option>
        </select>

        <button
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <p className="results-count">
        {filteredProducts.length} products found
      </p>

      {filteredProducts.length > 0 ? (
        <>
          <div className="products-grid">
            {filteredProducts
              .slice(0, visibleCount)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="load-more-container">
              <button
                onClick={() =>
                  setVisibleCount(
                    (current) => current + 8
                  )
                }
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <h2>No products found</h2>
          <p>
            Try changing your search or filters.
          </p>

          <button onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Products;