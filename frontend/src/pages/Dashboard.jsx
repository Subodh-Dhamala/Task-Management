import { useEffect, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { projects, loading, error, fetchProjects, createProject, deleteProject } = useProjects();
  const [showForm, setShowForm] = useState(false);

  // Fetch projects when component loads
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project creation
  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData.name, formData.description);
      setShowForm(false); // Close form on success
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  // Handle project deletion
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  if (loading && projects.length === 0) {
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
        <button 
          className="btn btn-create" 
          onClick={handleButtonClick}
        >
          + New Project
        </button>
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

      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;