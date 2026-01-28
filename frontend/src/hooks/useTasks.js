import { useState } from 'react';
import api from '../api/axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks in a project
  const fetchTasks = async (projectId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/projects/${projectId}/tasks`);
      setTasks(response.data);

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch tasks');
      setLoading(false);
      console.error('Error fetching tasks:', err);
    }
  };

  // Create new task
  const createTask = async (projectId, taskData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post(`/projects/${projectId}/tasks`, taskData);

      // Add new task to the list
      setTasks([...tasks, response.data]);

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create task');
      setLoading(false);
      console.error('Error creating task:', err);
      throw err;
    }
  };

  // Update task
  const updateTask = async (taskId, data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.put(`/tasks/${taskId}`, data);

      // Update task in the list
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data : task
        )
      );

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update task');
      setLoading(false);
      console.error('Error updating task:', err);
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/tasks/${taskId}`);

      // Remove task from the list
      setTasks(tasks.filter((task) => task._id !== taskId));

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete task');
      setLoading(false);
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};  // ← MAKE SURE THIS CLOSING BRACE IS HERE!