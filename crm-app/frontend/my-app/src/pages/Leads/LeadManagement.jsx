import useFetch from "../../useFetch";
import "./LeadManagement.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LeadManagement() {
  //http://localhost:3000
  //${import.meta.env.VITE_API_BASE_URL}
  const [commentText, setCommentText] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { id } = useParams();
  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/leads`);

  const {
    data: agents,
    loading: agentLoading,
    error: agentError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/agents`);

  const {
    data: comments,
    loading: commentLoading,
    error: commentError,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/api/leads/${id}/comments`);

  const leadData = leads?.find((item) => item._id === id);
  const salesAgentData = agents.find(
    (item) => item._id === leadData?.salesAgent,
  );

  const filterCommentData = comments?.filter((item) => item.lead === id);
  console.log("filterCommentData", filterCommentData);
  const commentData = filterCommentData.map((item) => ({
    ...item,
    authorName: item.author?.name || "deleted user",
  }));
  console.log(commentData);
  //const navigate = useNavigate();

  function handleDateTime(givenDate) {
    const isoData = givenDate;
    const date = new Date(isoData);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedDate;
  }

  if (!leadData) {
    return <div>No Lead Found</div>;
  }

  if (leadsLoading || agentLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (leadsError || agentError || commentError) {
    return <div>Error loading data</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return; //prevent from double click

    setIsSubmitting(true);

    const newCommentData = {
      lead: id,
      author: selectedAgent,
      commentText: commentText,
    };

    //console.log("Payload:", newCommentData);

    try {
      const responseData = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/leads/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
        },
      );

      const result = await responseData.json();

      if (!responseData.ok) {
        console.error(result.error || "something went wrong");
        setIsSubmitting(false);
        return;
      }
      console.log("Success:", result);

      //clear text
      setCommentText("");
      setSelectedAgent("");

      window.location.reload();
      // navigate(`/leadManage/${id}`, { state: { newComment: result.data } });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/" onClick={() => setIsSidebarOpen(false)}>
              ← Dashboard
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1>{leadData.name}</h1>
        </header>

        <div className="lead-grid">
          {/* left side */}
          <div className="left-section">
            {/* Lead details */}
            <div className="detail-card">
              <h2>Lead Details</h2>

              <p>
                <strong>Name:</strong> {leadData.name}
              </p>
              <p>
                <strong>Agent:</strong> {salesAgentData?.name}
              </p>
              <p>
                <strong>Source:</strong> {leadData.source}
              </p>
              <p>
                <strong>Status:</strong> {leadData.status}
              </p>
              <p>
                <strong>Priority:</strong> {leadData.priority}
              </p>
              <p>
                <strong>Time to Close:</strong> {leadData.timeToClose}
              </p>
            </div>

            {/* lead edit button */}
            <Link to={`/editleads/${id}`}>
              <button className="add-btn edit-btn">Edit Lead</button>
            </Link>
          </div>

          {/* right side */}
          <div className="right-section">
            <div className="form-card">
              <h3>Add Comment</h3>

              <form onSubmit={handleSubmit} className="comment-form">
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="">Select Agent</option>
                  {agents.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <textarea
                  rows="4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />

                <button type="submit" className="add-btn">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* comment lists view */}
        <div className="comments-card">
          <h2>Comments</h2>

          {commentData.map((item) => (
            <div className="comment-box" key={item._id}>
              <h4>{item.authorName}</h4>
              <p>{handleDateTime(item.createdAt)}</p>
              <p>{item.commentText}</p>
            </div>
          ))}
        </div>
      </main>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
