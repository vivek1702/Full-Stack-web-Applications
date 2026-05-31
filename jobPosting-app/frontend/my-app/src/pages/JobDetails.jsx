import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import { useParams } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import "./JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [applied, setApplied] = useState(false);

  const {
    data: job,
    loading,
    error,
  } = UseFetch(`http://localhost:3000/api/auth/jobListing/${id}`);

  console.log("____", job);
  console.log("ID:", id);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="loading-text">{error}</p>;
  }

  if (!job) {
    return <p className="loading-text">Job not found</p>;
  }

  return (
    <div className="job-details-page">
      <div className="job-details-card">
        <h1>{job.title}</h1>

        <p className="company-name">{job.details.CompanyName}</p>

        <div className="job-meta">
          <span>{job.details.location}</span>
          <span>{job.details.type}</span>
          <span>₹ {job.details.salary} LPA</span>
        </div>

        <section>
          <h3>Description</h3>
          <p>{job.description}</p>
        </section>

        <section>
          <h3>Qualifications</h3>
          <p>{job.qualifications}</p>
        </section>

        {user?.role === "candidate" ? (
          <button
            className={`apply-btn-details ${applied ? "applied" : ""}`}
            onClick={() => setApplied(true)}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply Now"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
