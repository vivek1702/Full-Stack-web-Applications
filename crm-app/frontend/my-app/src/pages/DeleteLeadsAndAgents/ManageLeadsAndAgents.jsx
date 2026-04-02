import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import "./ManageLeadsAndAgents.css";
import { useEffect, useState } from "react";

export default function ManageLeadsAgents() {
  // ${import.meta.env.VITE_API_BASE_URL}
  const [leadList, setLeadList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/leads`);

  const {
    data: agents,
    loading: agentsLoading,
    error: agentsError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/agents`);

  useEffect(() => {
    setLeadList(leads);
  }, [leads]);

  useEffect(() => {
    setAgentList(agents);
  }, [agents]);

  async function handleLeadDelete(getId) {
    //console.log(getId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/leads/${getId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.error(result.error || "something went wrong");
        return;
      }
      console.log("lead deleted sucessfully");

      //changing the state of frontend
      setLeadList((prev) => prev.filter((item) => item._id !== getId));
      setMessage("Lead deleted successfully ✅");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Something went wrong ❌");
      console.error(error);
    }
  }

  async function handleAgentDelete(getId) {
    console.log(getId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/agents/${getId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.error(result.error || "something went wrong");
        return;
      }
      console.log("agent deleted sucessfully");

      //changing the state of frontend
      setAgentList((prev) => prev.filter((item) => item._id !== getId));
      setMessage("agent deleted successfully ✅");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("Something went wrong ❌");
      console.error(error);
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
          <h1>Manage Leads & Sales Agents</h1>
        </header>

        {message && <div className="toast-message">{message}</div>}

        <div className="manage-grid">
          {/* LEFT: LEADS */}
          <div className="manage-card">
            <h2 className="card-title">Delete Leads</h2>

            {leadList?.map((item) => (
              <div className="list-row" key={item._id}>
                <span className="item-name">{item.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleLeadDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: AGENTS */}
          <div className="manage-card">
            <h2 className="card-title">Delete Sales Agents</h2>

            {agentList?.map((item) => (
              <div className="list-row" key={item._id}>
                <span className="item-name">{item.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleAgentDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
