import { useState } from "react";
import api from "../api/axios";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/projects");
      setProjects(response.data);

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch projects");
      setLoading(false);
      console.error("Error fetching projects:", err);
    }
  };

  const createProject = async (name, description) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/projects", { name, description });

      setProjects([...projects, response.data]);

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create project");
      setLoading(false);
      console.error("Error Creating Project: ", err);
      throw err;
    }
  };

  const updateProject = async (id, data) => {
    try {
      setLoading(true);
      setError(null);

      // FIX: Use backticks for template literal
      const response = await api.put(`/projects/${id}`, data);

      setProjects(
        projects.map((project) =>
          project._id === id ? response.data : project
        )
      );

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update project");
      setLoading(false);
      console.error("Error updating project:", err);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/projects/${id}`);

      setProjects(projects.filter((project) => project._id !== id));

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete project");
      setLoading(false);
      console.error("Error deleting project:", err);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};  // ← THIS CLOSING BRACE WAS MISSING!