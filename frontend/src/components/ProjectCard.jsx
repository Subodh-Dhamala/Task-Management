import { useNavigate } from "react-router-dom";
import "../styles/projectCard.css";
import { formatDate } from "../utils/formatDate";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate(`/projects/${project._id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"`)) {
      onDelete(project._id);
    }
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-card-title">{project.name}</h3>
      </div>

      <div className="project-card-body">
        <p className="project-card-description">
          {project.description || "No description provided!"}
        </p>
      </div>

      <div className="project-card-footer">
        <div className="project-card-info">
          <span className="project-card-date">Created On : {formatDate(project.createdAt)}</span>
        </div>

        <div className="project-card-actions">
          <button className="btn btn-primary" onClick={handleViewTasks}>
            View Tasks
          </button>

          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;