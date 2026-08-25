import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("0791234567");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  const orders = [
    { id: 1001, total: 850, status: "Delivered" },
    { id: 1002, total: 120, status: "Processing" },
    { id: 1003, total: 420, status: "Shipped" },
    { id: 1004, total: 75, status: "Delivered" },
    { id: 1005, total: 300, status: "Pending" },
  ];

  if (!user) {
    return (
      <section className="profile-page">
        <div className="profile-card">
          <h2>Please login first</h2>

          <button onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  function saveProfile(e) {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setMessage("Name and phone are required");
      return;
    }

    setMessage("Profile updated successfully");
  }

  function changePassword(e) {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      setMessage("Please complete password fields");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMessage("Password changed successfully");
  }

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      logout();
      navigate("/login");
    }
  }

  return (
    <section className="profile-page">
      <div className="profile-content">

        <div className="profile-card">
          <h1>My Account</h1>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <form onSubmit={saveProfile}>
            <label>Full Name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Phone</label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button type="submit">
              Save Profile
            </button>
          </form>
        </div>

        <div className="profile-card">
          <h2>Change Password</h2>

          <form onSubmit={changePassword}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <button type="submit">
              Change Password
            </button>
          </form>

          {message && (
            <p className="profile-message">
              {message}
            </p>
          )}
        </div>

        <div className="profile-card profile-orders">
          <h2>Previous Orders</h2>

          {orders.map((order) => (
            <div className="profile-order" key={order.id}>
              <span>Order #{order.id}</span>
              <span>${order.total}</span>
              <strong>{order.status}</strong>
            </div>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </section>
  );
}

export default Profile;