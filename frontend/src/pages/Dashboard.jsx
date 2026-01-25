import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useProjects } from "../hooks/useProjects";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { projects, loading, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <div>Loading Projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, <b>{user.username}</b>!</p>}
      <p>Total Projects: {projects.length}</p>

      {projects.length === 0 ? (
        <p>No Projects yet. Create Your First Project!</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              {project.name} - {project.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
