const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body p-2 d-flex justify-content-between align-items-center">

        <span>{task.title}</span>

        <div className="d-flex gap-2">
          {/* ✅ EDIT */}
          <button
            className="btn btn-sm btn-warning"
            onClick={() => onEdit(task)}
          >
            ✎
          </button>

         
        </div>

      </div>
    </div>
  );
};

export default TaskCard;