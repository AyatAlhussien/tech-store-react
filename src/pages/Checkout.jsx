import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "",
  });

  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.payment
    ) {
      setMessage("Please complete all fields");
      return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    setMessage(`Order completed successfully. Order #${orderNumber}`);
    clearCart();
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            placeholder="Address"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            placeholder="City"
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setForm({ ...form, payment: e.target.value })
            }
          >
            <option value="">Payment Method</option>
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit Card</option>
          </select>

          <button type="submit">
            Confirm Order
          </button>

          {message && <p>{message}</p>}
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
            </p>
          ))}

          <h3>Total: ${total}</h3>
        </div>
      </div>
    </section>
  );
}

export default Checkout;