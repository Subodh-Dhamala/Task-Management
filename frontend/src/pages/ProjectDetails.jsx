import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { TASK_STATUS } from '../utils/constants';
import '../styles/projectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get project data
  const { projects, loading: projectsLoading, fetchProjects } = useProjects();
  const project = projects.find(p => p._id === id);

  // Get tasks data
  const { tasks, loading: tasksLoading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();

  // Local state for form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch project and tasks on mount or when ID changes
  useEffect(() => {
    fetchProjects();
    fetchTasks(id);
  }, [id]);

  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === TASK_STATUS.TODO);
  const inProgressTasks = tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS);
  const doneTasks = tasks.filter(task => task.status === TASK_STATUS.DONE);

  // Handle create task
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(id, taskData);
      setShowTaskForm(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  // Handle edit task
  const handleEditTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // Handle edit button click
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Handle delete task
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Loading state - CHECK BOTH LOADINGS
  if (projectsLoading || tasksLoading) {
    return (
      <div className="project-details">
        <div className="loading-container">
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="project-details">
        <div className="error-container">
          <p>Error: {error}</p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  // Project not found
  if (!project) {
    return (
      <div className="project-details">
        <div className="error-container">
          <h2>Project not found</h2>
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-details">
      {/* Project Header */}
      <div className="project-header">
        <div className="project-info">
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1 className="project-name">📁 {project.name}</h1>
          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
        </div>
        <button 
          className="btn btn-create-task" 
          onClick={() => setShowTaskForm(true)}
        >
          + New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {/* TODO Column */}
        <div className="kanban-column">
          <div className="column-header todo-header">
            <h3>📋 To Do</h3>
            <span className="task-count">{todoTasks.length}</span>
          </div>
          <div className="column-content">
            {todoTasks.length === 0 ? (
              <div className="empty-column">
                <p>No tasks yet</p>
              </div>
            ) : (
              todoTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="kanban-column">
          <div className="column-header in-progress-header">
            <h3>🔄 In Progress</h3>
            <span className="task-count">{inProgressTasks.length}</span>
          </div>
          <div className="column-content">
            {inProgressTasks.length === 0 ? (
              <div className="empty-column">
                <p>No tasks in progress</p>
              </div>
            ) : (
              inProgressTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>

        {/* DONE Column */}
        <div className="kanban-column">
          <div className="kanban-column">
          <div className="column-header done-header">
            <h3>✅ Done</h3>
            <span className="task-count">{doneTasks.length}</span>
          </div>
          <div className="column-content">
            {doneTasks.length === 0 ? (
              <div className="empty-column">
                <p>No completed tasks</p>
              </div>
            ) : (
              doneTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={handleCancelForm}
          initialData={editingTask}
          isEdit={!!editingTask}
        />
      )}
    </div>
  );
};

export default ProjectDetails;