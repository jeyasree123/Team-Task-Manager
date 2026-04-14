import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/authApi";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    totalTasks: 0,
    pending: 0,
    inProgress: 0,
  });

  // 🔥 Normalize status
  const normalizeStatus = (status) => {
    return status?.toUpperCase();
  };

  // ✅ FETCH ALL TASKS
  const fetchAllTasks = async (teamsList) => {
    try {
      const requests = teamsList.map((team) =>
        api.get(`/tasks/${team.id}`)
      );

      const responses = await Promise.allSettled(requests);

      let allTasks = [];

      responses.forEach((res) => {
        if (res.status === "fulfilled") {
          allTasks = [...allTasks, ...res.value.data];
        } else {
          console.error("Task fetch failed:", res.reason);
        }
      });

      setTasks(allTasks);
      calculateStats(allTasks);
    } catch (err) {
      console.error("Task error:", err);
    }
  };

  // ✅ CALCULATE STATS
  const calculateStats = (tasksList) => {
    let pending = 0;
    let inProgress = 0;

    tasksList.forEach((t) => {
      const status = normalizeStatus(t.status);

      if (status === "PENDING") pending++;
      if (status === "IN_PROGRESS") inProgress++;
    });

    setStats({
      totalTasks: tasksList.length,
      pending,
      inProgress,
    });
  };

  // 🔥 SORT TASKS
  const getSortedTasks = () => {
    return [...tasks].sort(
      (a, b) =>
        new Date(b.createdAt || b.created_at || 0) -
        new Date(a.createdAt || a.created_at || 0)
    );
  };

  // ✅ FETCH TEAMS INSIDE useEffect (FIX 🔥)
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get("/teams");
        setTeams(res.data);

        fetchAllTasks(res.data);
      } catch (err) {
        console.error("Teams error:", err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="container-fluid mt-4">
        <h4 className="text-light">Dashboard</h4>

        {/* STATS */}
        <div className="row mt-3">
          <div className="col-md-3">
            <div className="card dark-card p-3">
              <h6>My Teams</h6>
              <h2>{teams.length}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dark-card p-3">
              <h6>Total Tasks</h6>
              <h2>{stats.totalTasks}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dark-card p-3">
              <h6>In Progress</h6>
              <h2>{stats.inProgress}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dark-card p-3">
              <h6>Pending</h6>
              <h2>{stats.pending}</h2>
            </div>
          </div>
        </div>

        {/* TASKS + ACTIVITY */}
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card dark-card p-3">
              <h5>My Recent Tasks</h5>

              <ul className="list-group list-group-flush">
                {tasks.length > 0 ? (
                  getSortedTasks()
                    .slice(0, 5)
                    .map((task) => (
                      <li
                        key={task.id}
                        className="list-group-item bg-transparent text-light d-flex justify-content-between"
                      >
                        <span className="text-dark fw-semibold">
                          {task.title || "No Title"}
                        </span>
                        <span className="badge bg-info">
                          {task.status}
                        </span>
                      </li>
                    ))
                ) : (
                  <li className="list-group-item bg-transparent text-light">
                    No tasks available
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card dark-card p-3">
              <h5>Activity Feed</h5>

              {tasks.length > 0 ? (
                getSortedTasks()
                  .slice(0, 3)
                  .map((task) => (
                    <div key={task.id} className="mb-3">
                      <p className="text-muted mb-1">
                        🆕 Created: <strong>{task.title}</strong>
                      </p>
                      <small className="text-secondary">
                        Status: {task.status}
                      </small>
                    </div>
                  ))
              ) : (
                <p className="text-muted">No activity yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
