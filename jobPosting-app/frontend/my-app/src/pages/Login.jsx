import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthorizationContext";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [highlightSignup, setHighlightSignup] = useState(false);

  const { setUser } = useContext(AuthContext);

  async function handleLogin() {
    try {
      setError("");

      const response = await fetch(
        "https://full-stack-web-applications-1-8u5z.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: secret,
          }),
        },
      );

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

      navigate("/joblistings");
      toast.success("Login successful");
    } catch (error) {
      setError("Something went wrong");
      toast.error("Unable to login");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side */}
        <div className="login-intro">
          <h1 className="intro-title">Welcome to JobSphere</h1>

          <p className="intro-subtitle">
            Discover opportunities, connect with employers, and take the next
            step in your career.
          </p>

          <div className="intro-features">
            <span>💼 Job Listings</span>
            <span>🏢 Employers</span>
            <span>📄 Applications</span>
            <span>🔍 Smart Search</span>
            <span>🚀 Career Growth</span>
          </div>

          <p className="intro-description desktop-only">
            Browse jobs from top companies, apply in minutes, and manage your
            applications from one place. Employers can post jobs and find the
            right candidates faster.
          </p>
        </div>

        {/* Right Side */}
        <div className="login-card">
          <h2 className="login-title">Sign In</h2>

          <p className="login-subtitle">Access your account to continue.</p>

          {/* Email */}
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
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

          {/* Login Button */}
          <button className="login-button" onClick={handleLogin}>
            Sign In
          </button>

          {/* Signup */}
          <div className="signup-row">
            <span className="signup-text">Don't have an account?</span>

            <button
              className={`signup-button ${highlightSignup ? "highlight" : ""}`}
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
