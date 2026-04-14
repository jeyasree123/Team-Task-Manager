import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/authApi";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TeamCollaboration from "../components/TeamCollaboration";

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  // normalize status
  const normalizeStatus = (status) => {
    if (!status) return "";
    return status.toUpperCase();
  };

  const statusMap = {
    PENDING: "pending",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
  };

  const reverseStatusMap = {
    pending: "PENDING",
    "in-progress": "IN_PROGRESS",
    completed: "COMPLETED",
  };

  // ✅ FETCH TASKS (FIXED)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/${teamId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks");
      }
    };

    if (teamId) fetchTasks();
  }, [teamId]);

  // ✅ SAVE TASK
  const saveTask = async () => {
    if (!taskData.title.trim()) return;

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User not logged in");
        return;
      }

      if (editTask) {
        await api.put(`/tasks/${editTask.id}`, {
          status: reverseStatusMap[taskData.status],
        });
      } else {
        await api.post("/tasks", {
          title: taskData.title,
          description: taskData.description,
          teamId: teamId,
          status: reverseStatusMap[taskData.status],
          assignedTo: userId,
        });
      }

      setTaskData({ title: "", description: "", status: "pending" });
      setEditTask(null);
      setShowModal(false);

      // 🔥 refresh
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError("Failed to save task");
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      window.location.reload(); // 🔥 refresh
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  const columns = [
    { title: "Pending", key: "pending" },
    { title: "In Progress", key: "in-progress" },
    { title: "Completed", key: "completed" },
  ];

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-3">
        <div className="row">

          {/* MEMBERS */}
          <div className="col-md-3">
            <TeamCollaboration teamId={teamId} />
          </div>

          {/* BOARD */}
          <div className="col-md-9">

            <div className="mb-3">
              <nav>
                <span
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                  onClick={() => navigate("/teams")}
                >
                  Teams
                </span> / Team Board
              </nav>

              <div className="d-flex justify-content-between mt-2">
                <h4>📋 Team Board</h4>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditTask(null);
                    setShowModal(true);
                  }}
                >
                  + New Task
                </button>
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
              {columns.map((col) => (
                <div className="col-md-4" key={col.key}>
                  <div className="card">

                    <div className="card-header bg-dark text-white text-center">
                      {col.title}
                    </div>

                    <div className="card-body bg-light" style={{ minHeight: "400px" }}>
                      {tasks
                        .filter((t) => {
                          const s = normalizeStatus(t.status);
                          return statusMap[s] === col.key;
                        })
                        .map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onEdit={(task) => {
                              setEditTask(task);
                              setTaskData({
                                title: task.title,
                                description: task.description,
                                status: statusMap[normalizeStatus(task.status)],
                              });
                              setShowModal(true);
                            }}
                          />
                        ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h5>{editTask ? "Edit Task" : "New Task"}</h5>

              <input
                className="form-control mb-2"
                placeholder="Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                disabled={editTask}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                disabled={editTask}
              />

              <select
                className="form-control mb-3"
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({ ...taskData, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button className="btn btn-success" onClick={saveTask}>
                  {editTask ? "Update" : "Create"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamDetails;
