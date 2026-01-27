import {useState} from 'react';
import api from '../api/axios';

export const useTasks =() =>{

  const [tasks,setTasks] = useState([]);
  const [loading,setLoading]=useState(false)
  const [error,setError] = useState(null);

  const fetchTasks = async (projectId)=>{
    try{
      setLoading(true);
      setError(null);

      const response = await api.get(`/projects/${projectId}/tasks`);
      setTasks(response.data);
    }

    catch(err){
      setError(err.response?.data?.msg || 'Failed to fetch tasks');
      setLoading(false);
      console.error('Error fetching task: ',err);
    }

  }

  const createTask = async (projectId,taskData)=>{
    try{
      setLoading(true);
      setError(null);

      const response = await api.post(`/projects/${projectId}/tasks`,taskData);

      setTasks([...tasks,response.data]);

      setLoading(false);
      
      return response.data;

    }catch(err){
      setError(err.response?.data?.msg || 'Failed to create task');
      setLoading(false);
      console.error('Error creating task: ',err);
      throw err;
    }
    }

    const updateTask = async (taskId,data)=>{
      try{
        setLoading(true);
        setError(null);

        const response = await put(`/tasks/${taskId}`,data);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? response.data : task
      )
      );

      setLoading(false);
      return response.data;
      }
      catch(err){

        setError(err.response?.data?.msg || 'Failed to update task');
        setLoading(false);
        console.error('Error updating task: ',err);
        throw err;
      }
    };

    const deleteTask = async (taskId) =>{
      try{

        setLoading(true);
        setError(null);

        await api.delete(`/tasks/${taskId}`);

        setTasks(tasks.filter((task)=>task._id !== taskId));

        setLoading(false);

      }catch(err){

        setError(err.response?.data?.msg || 'Failed to delete task');
        setLoading(false);
        console.error('Error deleting task: ',err);
        throw err;
      }
    };

    return{
      tasks,
      loading,
      error,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
    };
  };





















