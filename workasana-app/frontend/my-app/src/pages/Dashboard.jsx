import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import UseTasks from "../hooks/UseTasks";
import UseProjects from "../hooks/UseProject";
import useFetch from "../hooks/useFetch";
import "./Dashboard.css";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function Dashboard() {
  const [projectFilter, setProjectFilter] = useState({
    createdBy: "",
    team: "",
    status: "",
    search: "",
  });

  //task filter
  const [taskFilter, setTaskFilter] = useState({
    search: "",
    projectId: "",
    team: "",
    owners: "",
    tags: "",
    status: "",
    sortBy: "",
    order: "",
  });

  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [refreshTasks, setRefreshTask] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // const [refreshEditTask, setRefreshEditTask] = useState(false);
  const { user } = useContext(AuthContext);

  //all users
  const {
    data: users,
    loading: userLoading,
    error: userError,
  } = useFetch("http://localhost:3000/api/users");

  //all admins
  const {
    data: admins,
    loading: adminLoading,
    error: adminError,
  } = useFetch("http://localhost:3000/api/admins");

  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useFetch(`http://localhost:3000/api/teams`);

  const {
    tasks,
    loading: taskLoading,
    error: taskError,
    isAdmin: taskIsAdmin,
  } = UseTasks(taskFilter, refreshTasks);

  const {
    projects,
    loading: projectLoading,
    error: projectError,
    isAdmin: projectIsAdmin,
  } = UseProjects(projectFilter, refreshProjects);

  console.log(tasks);

  if (taskError || projectError || userError || teamError)
    return (
      <p className="error">
        {taskError || projectError || userError || teamError}
      </p>
    );

  console.log(users);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <p className="active">Dashboard</p>
          <p>Teams</p>
          <p>Reports</p>
          <p>Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/*create  Projects Section */}
        {openProjectModal && (
          <CreateProjectModal
            onClose={() => setOpenProjectModal(false)}
            onProjectCreated={() => setRefreshProjects((prev) => !prev)}
          />
        )}

        {/* project section */}
        <section className="section">
          <div className="section-header">
            <h2>{projectIsAdmin ? "All Projects" : "My Projects"}</h2>

            <div className="header-actions">
              {/* search */}
              <input
                type="text"
                placeholder="Search projects..."
                value={projectFilter.search}
                onChange={(e) =>
                  setProjectFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
              />

              {/* team */}
              <select
                value={projectFilter.team}
                onChange={(e) =>
                  setProjectFilter((prev) => ({
                    ...prev,
                    team: e.target.value,
                  }))
                }
              >
                <option value="">All Teams</option>

                {teamData?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* admin filter */}
              {projectIsAdmin && (
                <select
                  value={projectFilter.createdBy}
                  onChange={(e) =>
                    setProjectFilter((prev) => ({
                      ...prev,
                      createdBy: e.target.value,
                    }))
                  }
                >
                  <option value="">All Admins</option>

                  {admins?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}

              {/* button */}
              {projectIsAdmin && (
                <button
                  className="primary-btn"
                  onClick={() => setOpenProjectModal(true)}
                >
                  + New Project
                </button>
              )}
            </div>
          </div>

          {/* project section */}
          {projectLoading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="card-grid">
              {projects.map((item) => (
                <div className="card" key={item._id}>
                  <span className={`status ${item.status?.toLowerCase()}`}>
                    {item.status}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  {/* memberslist */}
                  <div className="avatar-group">
                    {item.team?.members?.slice(0, 3).map((m) => (
                      <div className="avatar" key={m._id} title={m.name}>
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    ))}

                    {item.team?.members?.length > 3 && (
                      <div
                        className="avatar more-users"
                        title={item.team.members
                          .slice(3)
                          .map((m) => m.name)
                          .join(", ")}
                      >
                        +{item.team.members.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* create task section */}

        {openTaskModal && (
          <CreateTaskModal
            onClose={() => setOpenTaskModal(false)}
            onTaskCreated={() => setRefreshTask((prev) => !prev)}
          />
        )}

        {openEditTaskModal && (
          <EditTaskModal
            taskId={selectedTaskId}
            onClose={() => {
              setOpenEditTaskModal(false);
              setSelectedTaskId(null);
            }}
            onTaskUpdated={() => setRefreshTask((prev) => !prev)}
          />
        )}

        {/* Tasks Section */}
        <section className="section">
          <div className="section-header">
            <h2>{taskIsAdmin ? "All Tasks" : "My Tasks"}</h2>

            <div className="header-actions">
              {/* search */}
              <input
                type="text"
                placeholder="Search tasks..."
                value={taskFilter.search}
                onChange={(e) =>
                  setTaskFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
              />

              {/* status */}
              <select
                value={taskFilter.status}
                onChange={(e) =>
                  setTaskFilter((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>

              {/* sorting */}
              <select
                value={taskFilter.order}
                onChange={(e) =>
                  setTaskFilter((prev) => ({
                    ...prev,
                    sortBy: "timeToComplete",
                    order: e.target.value,
                  }))
                }
              >
                <option value="">Sort By Time</option>
                <option value="asc">Low → High</option>
                <option value="desc">High → Low</option>
              </select>

              {/* admin filters */}
              {taskIsAdmin && (
                <>
                  <select
                    value={taskFilter.team}
                    onChange={(e) =>
                      setTaskFilter((prev) => ({
                        ...prev,
                        team: e.target.value,
                      }))
                    }
                  >
                    <option value="">All Team</option>

                    {teamData?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {/* user filter */}
                  <select
                    value={taskFilter.owners}
                    onChange={(e) =>
                      setTaskFilter((prev) => ({
                        ...prev,
                        owners: e.target.value,
                      }))
                    }
                  >
                    <option value="">All Users</option>

                    {users?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {/* button */}
              <button
                className="primary-btn"
                onClick={() => setOpenTaskModal(true)}
              >
                + New Task
              </button>
            </div>
          </div>

          {taskLoading ? (
            <p>task loading...</p>
          ) : (
            <div className="card-grid">
              {tasks?.map((item) => (
                <div className="card" key={item._id}>
                  <span
                    className={`status ${item.status?.toLowerCase().replace(/\s+/g, "")}`}
                  >
                    {item.status}
                  </span>
                  <h3>{item.name}</h3>
                  <p>Time To Complete: {item.timeToComplete} Days</p>
                  <div className="avatar-group">
                    {item.owners?.slice(0, 3).map((owner) => (
                      <div
                        className="avatar"
                        key={owner._id}
                        title={owner.name}
                      >
                        {owner.name.charAt(0).toUpperCase()}
                      </div>
                    ))}

                    {item.owners?.length > 3 && (
                      <div
                        className="avatar more-users"
                        title={item.owners
                          .slice(3)
                          .map((o) => o.name)
                          .join(", ")}
                      >
                        +{item.owners.length - 3}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTaskId(item._id);
                      setOpenEditTaskModal(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
