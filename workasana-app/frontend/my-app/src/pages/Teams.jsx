import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Teams.css";
import { Link } from "react-router-dom";
import CreateTeamModal from "./CreateTeamModal";
import EditTeamModal from "./EditTeamModal";
import UseTeams from "../hooks/UseTeams";

export default function Teams() {
  const [OpenTeamModal, setOpenTeamModal] = useState(false);
  const [refreshTeams, setRefreshTeams] = useState(false);
  const [teamFilter, setTeamFilter] = useState({ name: "", description: "" });
  const [selectedTeamId, setselectedTeamId] = useState("");
  const [OpenEditTeamModal, setOpenEditTeamModal] = useState(false);

  const {
    teams: teamsData,
    loading: teamsLoading,
    error: teamsError,
    isAdmin: teamIsAdmin,
  } = UseTeams(teamFilter, refreshTeams);

  console.log(teamsData, "teams-Data");

  if (teamsLoading) return <p className="loading">Loading...</p>;

  if (teamsError) return <p className="error">{teamsError}</p>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link to="/dashboard" style={{ "text-decoration": "none" }}>
            <p>Dashboard</p>
          </Link>

          <Link to="/teams" style={{ "text-decoration": "none" }}>
            <p className="active">Teams</p>
          </Link>

          <p>Reports</p>
          <p>Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/*create team Section */}
        {OpenTeamModal && (
          <CreateTeamModal
            onClose={() => setOpenTeamModal(false)}
            onTeamCreated={() => setRefreshTeams((prev) => !prev)}
          />
        )}
        {/* edit team modal */}
        {OpenEditTeamModal && (
          <EditTeamModal
            onClose={() => setOpenEditTeamModal(false)}
            onTeamEdit={() => setRefreshTeams((prev) => !prev)}
            teamId={selectedTeamId}
          />
        )}
        <section className="section">
          <div className="section-header">
            <h2>Teams</h2>

            {teamIsAdmin && (
              <div className="header-actions">
                <button
                  className="primary-btn"
                  onClick={() => setOpenTeamModal(true)}
                >
                  + New Team
                </button>
              </div>
            )}
          </div>

          <div className="card-grid">
            {teamsData?.map((item) => (
              <div className="card team-card" key={item._id}>
                {/* Top */}
                <div className="team-card-top">
                  <div>
                    <h3>{item.name}</h3>

                    <p className="team-description">{item.description}</p>
                  </div>

                  {/* update team */}
                  {teamIsAdmin && (
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setOpenEditTeamModal(true);
                        setselectedTeamId(item._id);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Divider */}
                <div className="team-divider"></div>

                {/* Team Details */}
                <div className="team-details">
                  <p className="member-count">
                    Members ({item.members?.length})
                  </p>

                  <div className="members-list">
                    {item.members?.slice(0, 4).map((member) => (
                      <div className="member-row" key={member._id}>
                        <div className="mini-avatar">
                          {member.name.charAt(0).toUpperCase()}
                        </div>

                        <span>{member.name}</span>
                      </div>
                    ))}

                    {item.members?.length > 4 && (
                      <p className="more-members">
                        +{item.members.length - 4} more members
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
