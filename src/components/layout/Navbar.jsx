import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        Tech Store
      </Link>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/products" onClick={closeMenu}>Products</Link>
        <Link to="/cart" onClick={closeMenu}>
          Cart ({cartCount})
        </Link>

        {!user && (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}

        {user && (
          <Link to="/profile" onClick={closeMenu}>
            Account
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" onClick={closeMenu}>
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;