import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function SalesAgentManagement() {
  const [salesAgentsName, setsalesAgentsName] = useState("");
  const [salesAgentEmail, setsalesAgentEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!salesAgentsName || !salesAgentEmail) {
      alert("All fields required");
      setIsSubmitting(false);
      return;
    }

    try {
      const newSalesAgent = {
        name: salesAgentsName,
        email: salesAgentEmail,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/agents`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newSalesAgent),
        },
      );

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        console.error(result.error || "something went wrong");
        setIsSubmitting(false);
        return;
      }
      setSuccessMsg("sales agent added successfully!");

      //clear data
      setsalesAgentsName("");
      setsalesAgentEmail("");

      // navigate with new agent
      navigate("/salesAgentList", { state: { newAgent: result } });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/" onClick={() => setIsSidebarOpen(false)}>
              ← Dashboard
            </Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1>Sales Agent Managment</h1>
        </header>
        {successMsg && <div className="success-alert">{successMsg}</div>}

        <div className="form-container">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={salesAgentsName}
                  onChange={(e) => setsalesAgentsName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={salesAgentEmail}
                  onChange={(e) => setsalesAgentEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating.." : "Add Sales Agent"}
              </button>
            </form>
          </div>
        </div>
      </main>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
