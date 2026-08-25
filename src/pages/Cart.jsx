import { Link } from "react-router";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h1>Your Cart</h1>
        <h2>Your cart is empty</h2>
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            max={item.stockQuantity}
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(
                item.id,
                Number(e.target.value)
              )
            }
          />

          <strong>
            ${item.price * item.quantity}
          </strong>

         <button
  className="remove-btn"
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmed) {
      removeFromCart(item.id);
    }
  }}
>
  Remove
</button>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: ${total}</h2>

        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    </section>
  );
}

export default Cart;