import { useState } from "react";
import UseFetch from "../hooks/UseFetch";
import "./CreateProjectModal.css";
import toast from "react-hot-toast";

export default function CreateProjectModal({ onClose, onProjectCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("Active");

  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = UseFetch(
    `https://full-stack-web-applications-fy35.onrender.com/api/teams`,
  );

  const handleForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("UserToken");

    const payload = {
      name,
      description,
      team,
      status,
    };

    const response = await fetch(
      "https://full-stack-web-applications-fy35.onrender.com/api/projects",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error || "Something went wrong");
      return;
    }

    toast.success("Project created successfully");
    console.log("Success:", result);

    setName("");
    setDescription("");
    setTeam("");
    setStatus("Active");

    onProjectCreated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="project-modal">
        {/* top */}
        <div className="modal-header">
          <h2>Create Project</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* form */}
        <form className="project-form" onSubmit={handleForm}>
          {/* name */}
          <div className="form-group">
            <label>Project Name</label>

            <input
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* team */}
          <div className="form-group">
            <label>Team</label>

            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              required
            >
              <option value="">Select Team</option>

              {teamData?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* status */}
          <div className="form-group">
            <label>Status</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>

              <option value="Completed">Completed</option>

              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* buttons */}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
