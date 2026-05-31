import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthorizationContext";
import UseFetch from "../hooks/UseFetch";
import "./JobListing.css";

export default function JobListings() {
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState(false);

  const navigate = useNavigate();

  const {
    data: jobs,
    loading,
    error,
  } = UseFetch(`http://localhost:3000/api/auth/jobListing?search=${search}`);

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div className="header-left">
          <h1 className="jobs-title">
            {user?.role === "employer" ? "My Job Postings" : "Available Jobs"}
          </h1>

          <p className="jobs-subtitle">
            {user?.role === "employer"
              ? "Manage your posted jobs"
              : "Explore opportunities and apply"}
          </p>
        </div>

        {user?.role === "employer" && (
          <div className="employer-actions">
            <button
              className="create-job-btn"
              onClick={() => navigate("/createjobs")}
            >
              + Create Job
            </button>

            <button
              className="delete-job-btn"
              onClick={() => navigate("/deletejobs")}
            >
              Delete Jobs
            </button>
          </div>
        )}
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search job title..."
          className="search-input"
        />
      </div>

      {loading ? (
        <p className="loading-text">Loading jobs...</p>
      ) : error ? (
        <p className="loading-text">{error}</p>
      ) : !jobs || jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs?.map((job) => (
            <div className="job-card" key={job._id}>
              <h2>{job.title}</h2>

              <p className="company-name">{job.details.CompanyName}</p>

              <div className="job-details">
                <span>{job.details.location}</span>
                <span>{job.details.type}</span>
              </div>

              <p className="salary">
                ₹ {job.details.salary}
                <span style={{ color: "black" }}> LPA</span>
              </p>

              <p className="description">{job.description?.slice(0, 120)}...</p>

              {user?.role === "candidate" && (
                <button
                  className="apply-btn-details"
                  onClick={() => navigate(`/jobdetails/${job._id}`)}
                >
                  Apply Now
                </button>
              )}
              <button
                className="manage-btn"
                onClick={() => navigate(`/jobdetails/${job._id}`)}
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
