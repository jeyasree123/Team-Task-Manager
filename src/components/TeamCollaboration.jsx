import { useEffect, useState, useCallback } from "react";
import api from "../api/authApi";

const TeamCollaboration = ({ teamId }) => {
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    try {
      const res = await api.get(`/teams/${teamId}/members`);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load members");
    }
  }, [teamId]);

  useEffect(() => {
    if (teamId) fetchMembers();
  }, [teamId, fetchMembers]);

  const addMember = async () => {
    if (!newMemberName.trim()) return;

    try {
      await api.post(`/teams/${teamId}/members`, {
        userName: newMemberName,
      });

      setNewMemberName("");
      fetchMembers();
    } catch (err) {
      console.error(err);
      setError("Failed to add member");
    }
  };

  const removeMember = async (memberId) => {
    try {
      await api.delete(`/teams/${teamId}/members/${memberId}`);
      fetchMembers();
    } catch (err) {
      console.error(err);
      setError("Failed to remove member");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header fw-bold">👥 Team Members</div>

      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            placeholder="Enter Username"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addMember}>
            Add
          </button>
        </div>

        {members.length === 0 ? (
          <p className="text-muted">No members yet</p>
        ) : (
          <ul className="list-group">
            {members.map((m) => (
              <li
                key={m.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{m.userName || m.id}</span>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeMember(m.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamCollaboration;
