import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import "./Settings.css";

export default function Settings() {
  const [refreshTasks, setRefreshTasks] = useState(false);

  const {
    data: tasks,
    loading,
    error,
  } = useFetch(
    `https://full-stack-web-applications-fy35.onrender.com/api/task?refresh=${refreshTasks}`,
  );

  // delete task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("UserToken");

      const response = await fetch(
        `https://full-stack-web-applications-fy35.onrender.com/api/task/${taskId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to delete task");
        return;
      }

      toast.success("Task deleted successfully");

      setRefreshTasks((prev) => !prev);
    } catch (error) {
      toast.error("Server error");
    }
  };

  if (loading) {
    return <p className="loading">Loading settings...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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
            <p>Reports</p>
          </Link>

          <Link to="/settings" className="sidebar-link">
            <p className="active">Settings</p>
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        <section className="section">
          <div className="section-header">
            <h2>Settings & Task Management</h2>
          </div>

          {/* top stats */}
          <div className="settings-top-grid">
            <div className="settings-stat-card">
              <h3>Total Tasks</h3>

              <p className="settings-number">{tasks?.length || 0}</p>
            </div>

            <div className="settings-stat-card danger">
              <h3>Danger Zone</h3>

              <p className="danger-text">Deleted tasks cannot be recovered</p>
            </div>
          </div>

          {/* tasks list */}
          <div className="settings-task-list">
            {tasks?.map((task) => (
              <div className="settings-task-card" key={task._id}>
                {/* left */}
                <div className="task-info">
                  <div className="task-top">
                    <h3>{task.name}</h3>

                    <span
                      className={`status ${task.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "")}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-meta">
                    <span>Team: {task.team?.name || "No Team"}</span>

                    <span>Project: {task.projectId?.name || "No Project"}</span>

                    <span>Days: {task.timeToComplete}</span>
                  </div>

                  {/* owners */}
                  <div className="avatar-group">
                    {task.owners?.slice(0, 4).map((owner) => (
                      <div
                        className="avatar"
                        key={owner._id}
                        title={owner.name}
                      >
                        {owner.name.charAt(0).toUpperCase()}
                      </div>
                    ))}

                    {task.owners?.length > 4 && (
                      <div className="avatar more-users">
                        +{task.owners.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* right */}
                <div className="task-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
