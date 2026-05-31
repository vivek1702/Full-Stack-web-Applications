import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup() {
    try {
      setError("");

      const response = await fetch(
        "https://full-stack-web-applications-1-8u5z.onrender.com/api/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      setError("Something went wrong");
      toast.error("Unable to create account");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side */}
        <div className="login-intro">
          <h1 className="intro-title">Join JobSphere</h1>

          <p className="intro-subtitle">
            Create your account and start exploring opportunities today.
          </p>

          <div className="intro-features">
            <span>💼 Post & Find Jobs</span>
            <span>🏢 Connect with Employers</span>
            <span>📄 Manage Applications</span>
            <span>🔍 Smart Search</span>
            <span>🚀 Grow Your Career</span>
          </div>

          <p className="intro-description desktop-only">
            Whether you're hiring talent or searching for your next opportunity,
            JobSphere makes the process simple and efficient.
          </p>
        </div>

        {/* Right Side */}
        <div className="login-card">
          <h2 className="login-title">Create Account</h2>

          <p className="login-subtitle">Fill in your details to get started.</p>

          <label className="login-label">Name</label>
          <input
            className="login-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <label className="login-label">Role</label>
          <select
            className="login-input"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" onClick={handleSignup}>
            Create Account
          </button>

          <div className="signup-row">
            <span className="signup-text">Already have an account?</span>

            <button className="signup-button" onClick={() => navigate("/")}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
