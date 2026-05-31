import { useNavigate } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import toast from "react-hot-toast";
import "./DeleteJobs.css";

export default function DeleteJobs() {
  const navigate = useNavigate();

  const {
    data: jobs,
    loading,
    error,
  } = UseFetch("http://localhost:3000/api/auth/jobListing");

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("UserToken");

      const response = await fetch(
        `http://localhost:3000/api/auth/jobListing/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Job deleted successfully");

      // Refresh page
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete job");
    }
  }

  if (loading) {
    return <p className="loading-text">Loading jobs...</p>;
  }

  if (error) {
    return <p className="loading-text">{error}</p>;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No jobs available</h3>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div>
          <h1 className="jobs-title">Delete Jobs</h1>
          <p className="jobs-subtitle">
            Select a job posting to remove it permanently.
          </p>
        </div>

        <button
          className="create-job-btn"
          onClick={() => navigate("/joblistings")}
        >
          Back
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h2>{job.title}</h2>

            <p className="company-name">{job.details.CompanyName}</p>

            <div className="job-details">
              <span>{job.details.location}</span>
              <span>{job.details.type}</span>
            </div>

            <p className="salary">₹ {job.details.salary} LPA</p>

            <p className="description">{job.description?.slice(0, 120)}...</p>

            <button
              className="delete-job-btn"
              onClick={() => handleDelete(job._id)}
            >
              Delete Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
