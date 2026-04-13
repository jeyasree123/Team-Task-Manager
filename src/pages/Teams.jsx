import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/authApi";
import TeamCard from "../components/TeamCard";
import Navbar from "../components/Navbar";

const Teams = () => {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");

  const fetchTeams = async () => {
    try {
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const createTeam = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/teams", { name });
      setName("");
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE TEAM
  const deleteTeam = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      const userId = localStorage.getItem("userId");

      await api.delete(`/teams/${teamId}`, {
        headers: { userId },
      });

      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* 🔥 Header with Dashboard Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Your Teams</h3>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            ← Dashboard
          </button>
        </div>

        {/* 🔥 Create Team */}
        <div className="card p-4 mb-4 shadow-sm border-0">
          <h5 className="mb-3">Create New Team</h5>

          <div className="d-flex gap-2">
            <input
              className="form-control"
              placeholder="Enter team name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-success px-4" onClick={createTeam}>
              Create
            </button>
          </div>
        </div>

        {/* 🔥 Teams List */}
        <div className="row">
          {teams.length > 0 ? (
            teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onDelete={deleteTeam}
              />
            ))
          ) : (
            <p className="text-muted text-center">
              No teams found. Create your first team 🚀
            </p>
          )}
        </div>

      </div>
    </>
  );
};

export default Teams;