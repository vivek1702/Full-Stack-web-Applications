import { useState } from "react";
import UseProjects from "../hooks/UseProject";
import useFetch from "../hooks/useFetch";
import "./CreateTaskModal.css";
import toast from "react-hot-toast";

export default function CreateTaskModal({ onClose, onTaskCreated }) {
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [team, setTeam] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [timeToComplete, setTimetoComplete] = useState(null);
  const [status, setStatus] = useState("To Do");

  // projects
  const { projects } = UseProjects();

  // teams
  const { data: teamData } = useFetch("http://localhost:3000/api/teams");

  // tags
  const { data: tagsData } = useFetch("http://localhost:3000/api/tags");

  // selected team
  const selectedTeam = teamData?.find((item) => item._id === team);

  // submit
  const handleForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("UserToken");

    const payload = {
      name,
      projectId,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    };

    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error || "Something went wrong");
      return;
    }

    toast.success("Task created successfully");
    console.log("Success:", result);

    // reset
    setName("");
    setProjectId("");
    setTeam("");
    setOwners([]);
    setTags([]);
    setTimetoComplete(0);
    setStatus("To Do");

    onTaskCreated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        {/* top */}
        <div className="modal-header">
          <h2>Create Task</h2>

          <button className="close-btn" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {/* form */}
        <form className="task-form" onSubmit={handleForm}>
          {/* task name */}
          <div className="form-group">
            <label>Task Name</label>

            <input
              type="text"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* project */}
          <div className="form-group">
            <label>Project</label>

            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="">Select Project</option>

              {projects?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* team */}
          <div className="form-group">
            <label>Team</label>

            <select
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
                setOwners([]);
              }}
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

          {/* owners */}
          <div className="form-group">
            <label>Owners</label>

            <div className="checkbox-group">
              {selectedTeam?.members?.map((item) => (
                <label key={item._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={item._id}
                    checked={owners.includes(item._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOwners((prev) => [...prev, item._id]);
                      } else {
                        setOwners((prev) =>
                          prev.filter((id) => id !== item._id),
                        );
                      }
                    }}
                  />

                  {item.name}
                </label>
              ))}
            </div>
          </div>

          {/* tags */}
          <div className="form-group">
            <label>Tags</label>

            <div className="checkbox-group">
              {tagsData?.map((item) => (
                <label key={item._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={tags.includes(item.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags((prev) => [...prev, item.name]);
                      } else {
                        setTags((prev) =>
                          prev.filter((prevName) => prevName !== item.name),
                        );
                      }
                    }}
                  />

                  {item.name}
                </label>
              ))}
            </div>
          </div>

          {/* time */}
          <div className="form-group">
            <label>Estimated Time to complete in Days</label>

            <input
              type="number"
              placeholder="Days"
              value={timeToComplete}
              onChange={(e) => setTimetoComplete(Number(e.target.value))}
              required
            />
          </div>

          {/* status */}
          <div className="form-group">
            <label>Status</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To Do">To Do</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>

              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* buttons */}
          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
