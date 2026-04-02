import useFetch from "../../useFetch";
import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Link } from "react-router-dom";
import "./ReportManagement.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

export default function ReportManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const { data: pipelineLeads } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/report/pipeline`,
  );
  const { data: closedLeads } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/report/closed`,
  );

  const { data: closedByAgents } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/report/agent-closed-leads`,
  );

  const { data: statusDistribution } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/report/leadsStatus-distrubition`,
  );

  const { data: lastWeekClosed } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/report/last-week`,
  );

  const leadsData = {
    labels: ["leads in pipeline", "closed leads"],
    datasets: [
      {
        data: [
          pipelineLeads.totalLeadsInPipeline,
          closedLeads.totalLeadsClosed,
        ],
        backgroundColor: ["#3b82f6", "#f59e0b"],
      },
    ],
  };

  const closedLeadsByAgent = {
    labels: closedByAgents.map((item) => item.agentName),
    datasets: [
      {
        label: "Closed Leads",
        data: closedByAgents.map((item) => item.closedLeads),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const statusByDistribution = {
    labels: statusDistribution.map((item) => item.status),
    datasets: [
      {
        label: "Status distribution count",
        data: statusDistribution.map((item) => item.count),
        backgroundColor: "#2563eb",
      },
    ],
  };

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
          <h1>Avanya CRM Reports</h1>
        </header>

        <section className="report-container">
          <h2 className="report-title">Report Overview</h2>

          <div className="report-grid">
            <div className="report-card report-pie">
              <Pie data={leadsData} options={options} />
            </div>

            <div className="report-card report-bar">
              <Bar data={closedLeadsByAgent} options={options} />
            </div>

            <div className="report-card report-bar">
              <Bar data={statusByDistribution} options={options} />
            </div>

            <div className="report-card report-summary">
              <h4>{lastWeekClosed?.length || 0}</h4>
              <p>Closed leads in last 7 days</p>
            </div>
          </div>
        </section>
      </main>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
