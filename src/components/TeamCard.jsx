import { useNavigate } from "react-router-dom";

const TeamCard = ({ team, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0 position-relative">
        
        {/* ❌ Delete Button */}
        <button
          className="btn btn-sm btn-outline-danger position-absolute"
          style={{
            top: "10px",
            right: "10px",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            padding: "0",
            lineHeight: "1",
          }}
          onClick={(e) => {
            e.stopPropagation(); // prevent unwanted clicks
            onDelete(team.id);
          }}
        >
          ×
        </button>

        <div className="card-body d-flex flex-column justify-content-between">
          
          {/* Team Name */}
          <div>
            <h5 className="card-title fw-bold text-primary">
              {team.name}
            </h5>

            <p className="text-muted small">
              Manage tasks and collaborate with your team efficiently.
            </p>
          </div>

          {/* ✅ KEEP THIS BUTTON (unchanged) */}
          <button
            className="btn btn-outline-primary mt-3 w-100"
            onClick={() => navigate(`/teams/${team.id}`)}
          >
            Open Board →
          </button>

        </div>

      </div>
    </div>
  );
};

export default TeamCard;