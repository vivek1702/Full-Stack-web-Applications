import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./CreateJobs.css";

export default function CreateJobs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    type: "Full - time(On - site)",
    description: "",
    qualifications: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("UserToken");

      const response = await fetch(
        "http://localhost:3000/api/auth/jobListing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to create job");
        return;
      }

      toast.success("Job created successfully");
      navigate("/joblistings");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="create-job-container">
      <div className="create-job-card">
        <h1>Create New Job</h1>

        <form onSubmit={handleSubmit}>
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Salary (Annual)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <label>Employment Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option>Full - time(On - site)</option>
            <option>Part - time(On - site)</option>
            <option>Full - time(Remote)</option>
            <option>Part - time(Remote)</option>
          </select>

          <label>Description</label>
          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Qualifications</label>
          <textarea
            rows="4"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />

          <button type="submit" className="create-job-btn">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
