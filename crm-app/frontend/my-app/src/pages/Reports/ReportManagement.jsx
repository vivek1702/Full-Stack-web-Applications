import useFetch from "../../useFetch";
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
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/">← Dashboard</Link>
          </li>
        </ul>
      </aside>

      <main className="report-main">
        <header className="report-header">
          <h1>Avanya CRM Reports</h1>
        </header>

        <section className="report-container">
          <h2 className="report-title">Report Overview</h2>

          <div className="report-grid">
            <div className="report-card report-pie">
              <Pie data={leadsData} />
            </div>

            <div className="report-card report-bar">
              <Bar data={closedLeadsByAgent} />
            </div>

            <div className="report-card report-bar">
              <Bar data={statusByDistribution} />
            </div>

            <div className="report-card report-summary">
              <h4>{lastWeekClosed?.length || 0}</h4>
              <p>Closed leads in last 7 days</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
