import { useEffect ,useContext} from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import '../styles/dashboard.css';
import {AuthContext} from '../context/AuthContext';

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const { projects, loading, error, fetchProjects, deleteProject } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <p className="loading-text">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Projects</h1>
         {user && <p>Welcome, <b>{user.username}</b>!</p>}
        <button className="btn btn-create">+ New Project</button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <h2>No projects yet</h2>
          <p>Create your first project to get started!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;