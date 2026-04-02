import useFetch from "../../useFetch";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedLead, setSelectedLead] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/leads`,
  );

  const leadStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const results =
    selectedLead === "All"
      ? data
      : data.filter((item) => item.status === selectedLead);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-layout">
      {/* SIDEBAR — always first in DOM */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/leadLists" onClick={() => setIsSidebarOpen(false)}>
              Leads
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/salesAgentList" onClick={() => setIsSidebarOpen(false)}>
              Sales Agent
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/reports" onClick={() => setIsSidebarOpen(false)}>
              Reports
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/deleteLeadsAgents"
              onClick={() => setIsSidebarOpen(false)}
            >
              Settings
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1>Anvaya CRM Dashboard</h1>
        </header>

        <div className="dashboard-card">
          <div className="left-section">
            {/* LEADS */}
            <div className="section">
              <div className="section-header">
                <h2>Leads</h2>
                <Link to="/addNewLead">
                  <button className="add-btn">+ Add Leads</button>
                </Link>
              </div>
              <ul className="lead-list">
                {results.map((item) => (
                  <li key={item._id}>
                    <Link to={`/leadManage/${item._id}`} className="lead-item">
                      <span>{item.name}</span>
                      <span className="arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* STATUS */}
            <div className="section">
              <h2>Lead Status</h2>
              <div className="status-grid">
                {leadStatus.map((item) => (
                  <div className="status-card" key={item}>
                    <p>{item}</p>
                    <h3>{data.filter((d) => d.status === item).length}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* FILTERS */}
            <div className="section">
              <h2>Quick Filter:</h2>
              <ul className="filter-list">
                <li>
                  <input
                    type="radio"
                    id="All"
                    name="leads"
                    value="All"
                    checked={selectedLead === "All"}
                    onChange={(e) => setSelectedLead(e.target.value)}
                    className="hidden-radio"
                  />
                  <label
                    htmlFor="All"
                    className={
                      selectedLead === "All"
                        ? "filter-btn active"
                        : "filter-btn"
                    }
                  >
                    All
                  </label>
                </li>
                {leadStatus.map((item) => (
                  <li key={item}>
                    <input
                      type="radio"
                      id={item}
                      name="leads"
                      value={item}
                      checked={selectedLead === item}
                      onChange={(e) => setSelectedLead(e.target.value)}
                      className="hidden-radio"
                    />
                    <label
                      htmlFor={item}
                      className={
                        selectedLead === item
                          ? "filter-btn active"
                          : "filter-btn"
                      }
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAY — MUST BE LAST so sidebar renders on top of it */}
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
