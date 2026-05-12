import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignup() {
    try {
      setError("");

      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: secret,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");

        if (response.status === 409) {
          toast.error("User already exists. Please login");
        } else {
          toast.error(data.message || "Signup failed");
        }

        return;
      }

      toast.success("Account created successfully");

      // redirect to login after signup
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* LEFT SIDE (same intro) */}
        <div className="login-intro">
          <h1 className="intro-title">Join Workasana</h1>
          <p className="intro-subtitle">
            Start managing your workflow efficiently.
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

        {/* RIGHT SIDE (Signup form) */}
        <div className="login-card">
          <h2 className="login-title">Signup</h2>

          {/* Name */}
          <label className="login-label">Name</label>
          <input
            className="login-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

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

          {/* Signup button */}
          <button className="login-button" onClick={handleSignup}>
            Create Account
          </button>

          {/* Already user */}
          <div className="signup-row">
            <span className="signup-text">Already have an account?</span>
            <button className="signup-button" onClick={() => navigate("/")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
