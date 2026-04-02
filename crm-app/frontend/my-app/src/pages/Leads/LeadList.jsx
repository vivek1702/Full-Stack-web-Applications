import useFetch from "../../useFetch";
import "./LeadList.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LeadList() {
  const [selectedLead, setSelectedLead] = useState("All");
  const [selectedAgent, setSelectedAgent] = useState("All");
  const [sortPriority, setSortPriority] = useState("lowToHigh");
  const [sortTimetoClose, setsortTimetoClose] = useState("desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/leads`);

  const {
    data: agents,
    loading: agentLoading,
    error: agentError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/agents`);

  const leadStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const priorityRank = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  let results = [...leads];
  // filter by status
  if (selectedLead !== "All") {
    results = results.filter((item) => item.status === selectedLead);
  }

  //filter by agents
  if (selectedAgent && selectedAgent !== "All") {
    results = results.filter((item) => item.salesAgent === selectedAgent);
  }

  // ✅ single sort
  results = results.sort((a, b) => {
    const priorityDiff =
      sortPriority === "highToLow"
        ? priorityRank[b.priority] - priorityRank[a.priority]
        : priorityRank[a.priority] - priorityRank[b.priority];

    if (priorityDiff !== 0) return priorityDiff;

    return sortTimetoClose === "asc"
      ? a.timeToClose - b.timeToClose
      : b.timeToClose - a.timeToClose;
  });

  if (leadsLoading || agentLoading) {
    return <div>Loading...</div>;
  }

  if (leadsError || agentError) {
    return <div>Error loading data</div>;
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

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1>Leads List</h1>
        </header>

        {/* FILTERS */}
        <div className="filters-section">
          <h2>Filters</h2>

          {/* STATUS FILTER */}
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
                  selectedLead === "All" ? "filter-btn active" : "filter-btn"
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
                    selectedLead === item ? "filter-btn active" : "filter-btn"
                  }
                >
                  {item}
                </label>
              </li>
            ))}
          </ul>

          {/* AGENT FILTER */}
          <div className="filter-group">
            <label>Sales Agent:</label>
            <select
              style={{
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#fffef5",
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
                outline: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="" disabled>
                Select Agent
              </option>
              <option value="All">All Agents</option>
              {agents.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* SORT */}
          <div className="filter-group">
            <label>Priority:</label>
            <select
              style={{
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#fffef5",
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
                outline: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              value={sortPriority}
              onChange={(e) => setSortPriority(e.target.value)}
            >
              <option value="highToLow">High → Low</option>
              <option value="lowToHigh">Low → High</option>
            </select>

            <label style={{ "margin-left": "20px" }}>Time:</label>
            <select
              style={{
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#fffef5",
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
                outline: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              value={sortTimetoClose}
              onChange={(e) => setsortTimetoClose(e.target.value)}
            >
              <option value="asc">Shortest</option>
              <option value="desc">Longest</option>
            </select>
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="table-container">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Priority</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {results.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link to={`/leadManage/${item._id}`} className="table-link">
                      {item.name}
                    </Link>
                  </td>
                  <td>{item.status}</td>
                  <td>
                    {
                      agents.find(
                        (agentItem) => agentItem._id === item.salesAgent,
                      )?.name
                    }
                  </td>
                  <td>{item.priority}</td>
                  <td>{item.timeToClose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD BUTTON */}
        <div className="add-section">
          <Link to="/addNewLead">
            <button className="add-btn">+ Add Leads</button>
          </Link>
        </div>
      </main>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
