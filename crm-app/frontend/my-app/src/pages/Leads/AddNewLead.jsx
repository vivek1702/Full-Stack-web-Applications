import { useState } from "react";
import "./AddNewLead.css";
import useFetch from "../../useFetch";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";

export default function AddNewLead() {
  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgents, setsalesAgents] = useState("");
  const [leadStatus, setleadStatus] = useState("");
  const [leadPriority, setLeadPriority] = useState("");
  const [selectTimetoClose, setselectTimetoClose] = useState(1);
  const [selectedTags, setselectedTags] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    data: agents,
    loading: agentLoading,
    error: agentError,
  } = useFetch(`http://localhost:3000/api/agents`);

  const {
    data: tags,
    loading: tagLoading,
    error: tagError,
  } = useFetch(`http://localhost:3000/api/tags`);

  const tagsOptions = tags?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const GivenLeadSource = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];

  const GivenLeadStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const Givenpriority = ["Low", "Medium", "High"];

  async function handleSubmit(e) {
    e.preventDefault();

    const newLeadData = {
      name: leadName,
      source: leadSource,
      salesAgent: salesAgents,
      status: leadStatus,
      tags: selectedTags,
      timeToClose: selectTimetoClose,
      priority: leadPriority,
    };

    console.log(newLeadData);

    try {
      const response = await fetch(`http://localhost:3000/api/leads`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newLeadData),
      });

      const result = await response.json();
      console.log("Success:", result);
      setSuccessMsg("Lead added successfully!");

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      //clear form data
      window.location.reload();
      setLeadName("");
      setLeadSource("");
      setsalesAgents("");
      setleadStatus("");
      setLeadPriority("");
      setselectTimetoClose(1);
      setselectedTags([]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
      <main className="main-content">
        <header className="header">
          <h1>Add New Lead</h1>
        </header>
        {successMsg && <div className="success-alert">{successMsg}</div>}
        <div className="form-container">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <label>Lead Name</label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Lead Source</label>
                <select
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                >
                  {GivenLeadSource.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Sales Agent</label>
                <select
                  value={salesAgents}
                  onChange={(e) => setsalesAgents(e.target.value)}
                >
                  {agents.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Lead Status</label>
                <select
                  value={leadStatus}
                  onChange={(e) => setleadStatus(e.target.value)}
                >
                  {GivenLeadStatus.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={leadPriority}
                  onChange={(e) => setLeadPriority(e.target.value)}
                >
                  {Givenpriority.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Time to Close</label>
                <input
                  type="number"
                  value={selectTimetoClose}
                  onChange={(e) => setselectTimetoClose(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Tags</label>
                <Select
                  isMulti
                  options={tagsOptions}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(selected) =>
                    setselectedTags(selected.map((item) => item.label))
                  }
                />
              </div>

              <button type="submit" className="submit-btn">
                + Create Lead
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
