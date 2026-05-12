import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("UserToken");
    setUser(null);
    navigate("/");
  }

  return (
    <div className="navbar">
      <h2 className="navbar-logo">Workasana</h2>

      <div className="navbar-right">
        {user && (
          <span className="navbar-user">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </span>
        )}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
