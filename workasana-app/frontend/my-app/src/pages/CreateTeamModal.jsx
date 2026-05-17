import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./CreateProjectModal.css";
import toast from "react-hot-toast";

export default function CreateTeamModal({ onClose, onTeamCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setmembers] = useState([]);

  //all users
  const {
    data: users,
    loading: userLoading,
    error: userError,
  } = useFetch("http://localhost:3000/api/users");

  const handleForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("UserToken");

    const payload = {
      name,
      description,
      members,
    };

    const response = await fetch("http://localhost:3000/api/teams", {
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

    toast.success("Team added successfully");
    console.log("Success:", result);

    setName("");
    setDescription("");
    setmembers([]);

    onTeamCreated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="project-modal">
        {/* top */}
        <div className="modal-header">
          <h2>Create Team</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* form */}
        <form className="project-form" onSubmit={handleForm}>
          {/* name */}
          <div className="form-group">
            <label>Team Name</label>

            <input
              type="text"
              placeholder="Enter Team name"
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
              placeholder="Team description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* members */}
          <div className="form-group">
            <label>members</label>
            {/* multiple select */}
            <div className="checkbox-group">
              {users?.map((item) => (
                <label key={item._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={item._id}
                    checked={members.includes(item._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setmembers((prev) => [...prev, item._id]);
                      } else {
                        setmembers((prev) =>
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
