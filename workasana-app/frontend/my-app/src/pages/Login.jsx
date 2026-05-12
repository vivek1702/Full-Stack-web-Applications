import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthorizationContext";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import toast from "react-hot-toast";

export default function Login() {
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [highlightSignup, setHighlightSignup] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setError("");

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: secret }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);

        if (data.type === "USER_NOT_FOUND") {
          setHighlightSignup(true);
          toast.error("User not found. Create an account");
        } else if (data.type === "INVALID_PASSWORD") {
          setHighlightSignup(false);
          toast.error("Incorrect password");
        }

        return;
      }

      localStorage.setItem("UserToken", data.token);

      const decoded = jwtDecode(data.token);
      setUser(decoded);

      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* right side */}
        <div className="login-intro">
          {/* mentioning app is about  */}
          <h1 className="intro-title">Welcome to Workasana</h1>
          <p className="intro-subtitle">
            Manage your workflow efficiently in one place.
          </p>

          <div className="intro-features">
            <span>📊 Dashboard</span>
            <span>✅ Tasks</span>
            <span>📁 Projects</span>
            <span>👥 Teams</span>
            <span>📈 Reports</span>
          </div>

          <p className="intro-description">
            Create tasks, manage teams, organize projects, and track performance
            with powerful insights.
          </p>
        </div>

        {/* left side */}
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          {/* Email */}
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {/* Password */}
          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your password"
          />

          {/* Error */}
          {error && <p className="login-error">{error}</p>}

          {/* Login button */}
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          {/* New user section */}
          <div className="signup-row">
            <span className="signup-text">New user?</span>
            <button
              className={`signup-button ${error ? "highlight" : ""}`}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
