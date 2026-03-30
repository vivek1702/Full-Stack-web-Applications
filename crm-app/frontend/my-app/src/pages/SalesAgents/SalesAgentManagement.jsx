import { useState } from "react";
import useFetch from "../../useFetch";
import { Link, useParams } from "react-router-dom";

export default function SalesAgentManagement() {
  const [salesAgentsName, setsalesAgentsName] = useState("");
  const [salesAgentEmail, setsalesAgentEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newSalesAgent = {
        name: salesAgentsName,
        email: salesAgentEmail,
      };

      const response = await fetch(`http://localhost:3000/api/agents`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newSalesAgent),
      });

      const result = await response.json();
      console.log("Success:", result);
      setSuccessMsg("sales agent added successfully!");

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      //clear data
      setsalesAgentsName("");
      setsalesAgentEmail("");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/">← Dashboard</Link>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
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
                  type="text"
                  value={salesAgentEmail}
                  onChange={(e) => setsalesAgentEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn">
                Add Sales Agent
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
