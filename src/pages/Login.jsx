import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please complete all fields");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(email, password);

      if (!success) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/profile");
    }, 800);
  }

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="login-email">Email</label>

        <input
          id="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>

        <input
          id="login-password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) =>
              setShowPassword(e.target.checked)
            }
          />
          Show Password
        </label>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <hr />

        <p>
          Customer: customer@example.com / customer123
        </p>

        <p>
          Admin: admin@example.com / admin123
        </p>
      </form>
    </section>
  );
}

export default Login;