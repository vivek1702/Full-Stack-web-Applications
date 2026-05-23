import useFetch from "../hooks/useFetch";
import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import "./Reports.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

export default function Reports() {
  const {
    data: pendingTask,
    loading: pendingLoading,
    error: pendingError,
  } = useFetch("http://localhost:3000/api/report/pending");

  const {
    data: closedTeam,
    loading: teamLoading,
    error: teamError,
  } = useFetch("http://localhost:3000/api/report/closed-by-team");

  const {
    data: closedOwners,
    loading: ownerLoading,
    error: ownerError,
  } = useFetch("http://localhost:3000/api/report/closed-by-owners");

  const {
    data: closedProjects,
    loading: projectLoading,
    error: projectError,
  } = useFetch("http://localhost:3000/api/report/closed-by-project");

  if (pendingLoading || teamLoading || ownerLoading || projectLoading) {
    return <p className="loading">Loading reports...</p>;
  }

  if (pendingError || teamError || ownerError || projectError) {
    return <p className="error">Something went wrong</p>;
  }

  // chart data
  const teamChartData = {
    labels: closedTeam?.map((item) => item._id || "Unknown") || [],

    datasets: [
      {
        label: "Tasks Closed",
        data: closedTeam?.map((item) => item.totalClosed) || [],
      },
    ],
  };

  const ownerChartData = {
    labels: closedOwners?.map((item) => item._id || "Unknown") || [],

    datasets: [
      {
        label: "Tasks Closed",
        data: closedOwners?.map((item) => item.totalClosed) || [],
      },
    ],
  };

  const projectChartData = {
    labels: closedProjects?.map((item) => item._id || "Unknown") || [],

    datasets: [
      {
        label: "Tasks Closed",
        data: closedProjects?.map((item) => item.totalClosed) || [],
      },
    ],
  };

  console.log("pendingTask", pendingTask);
  console.log("closedTeam", closedTeam);
  console.log("closedOwners", closedOwners);
  console.log("closedProjects", closedProjects);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link">
            <p>Dashboard</p>
          </Link>

          <Link to="/teams" className="sidebar-link">
            <p>Teams</p>
          </Link>

          <Link to="/reports" className="sidebar-link">
            <p className="active">Reports</p>
          </Link>

          <p>Settings</p>
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Header */}
        <section className="section">
          <div className="section-header">
            <h2>Reports & Analytics</h2>
          </div>

          {/* Stats Cards */}
          <div className="reports-stats-grid">
            <div className="report-stat-card">
              <h3>Pending Tasks</h3>

              <p className="stat-number">{pendingTask?.totalTask || 0}</p>

              <span>Total pending tasks</span>
            </div>

            <div className="report-stat-card">
              <h3>Pending Days</h3>

              <p className="stat-number">
                {pendingTask?.totalDaysPending || 0}
              </p>

              <span>Estimated workload days</span>
            </div>
          </div>

          {/* Charts */}
          <div className="reports-chart-grid">
            {/* Team Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Closed Tasks By Team</h3>
              </div>

              <div className="chart-container">
                <Bar data={teamChartData} />
              </div>
            </div>

            {/* Owners Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Closed Tasks By Owners</h3>
              </div>

              <div className="chart-container">
                <Pie data={ownerChartData} />
              </div>
            </div>

            {/* Projects Chart */}
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Closed Tasks By Projects</h3>
              </div>

              <div className="chart-container">
                <Bar data={projectChartData} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
