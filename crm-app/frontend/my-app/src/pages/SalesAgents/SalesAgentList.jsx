import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import "./SalesAgentList.css";

export default function SalesAgentList() {
  const {
    data: salesAgent,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/agents`);

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
          <h1>Sales Agent Management</h1>
        </header>

        <section className="agent-section">
          <div className="agent-header">
            <h2>Sales Agent List</h2>

            <Link to="/salesAgentManagment">
              <button className="add-agent-btn">+ Add Agent</button>
            </Link>
          </div>

          <div className="agent-list">
            {salesAgent?.map((item) => (
              <div className="agent-card" key={item._id}>
                <p className="agent-name">{item.name}</p>
                <p className="agent-email">{item.email}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
