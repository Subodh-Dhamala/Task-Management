import {TASK_STATUS_LABELS,TASK_PRIORITY_LABELS,PRIORITY_COLORS} from '../utils/constants';
import {formatDate} from '../utils/formatDate';
import '../styles/taskCard.css';

const TaskCard = ({task, onEdit, onDelete,onStatusChange}) =>{

const handleStatusChange = (e)=>{
  onStatusChange(task._id, e.target.value);
};

const handleDelete = ()=>{
  if(window.confirm(`Are you sure you want to delete "${task.title}"?`)){
    onDelete(task._id);
  }
};

const handleEdit = ()=>{
  onEdit(task);
}

const priorityColor = PRIORITY_COLORS[task.priority];

return(

  <div className="task-card">
    
    <div className="task-card-header">
      <h4 className="task-title">{task.title}</h4>
      <span className="priority-badge"
        style={{backgroundColor:priorityColor}}
      >
        {TASK_PRIORITY_LABELS[task.priority]}
      </span>
    </div>

    {task.description &&(
      <div className="task-description">
        <p>{task.description}</p>
      </div>
  
    )}

    <div className="task-meta">
      {task.dueDate && (
        <div className="task-meta-item">
          <span className="meta-text">
            Due: {formatDate(task.dueDate)}
          </span>
        </div>
      )}
    </div>

    {task.assignedTo &&(
      <div className="task-meta-item">
        <span className="meta-text">Assigned</span>
      </div>
    )}

    <div className="task-status">
      <label htmlFor="{`status-${task._id}`}">Status:</label>
      <select
       id="{`status-${task._id}`}"
        value={task.status}
        onChange={handleStatusChange}
        className='status-select'
       >

        <option value="todo">{TASK_STATUS_LABELS.todo}</option>
          <option value="in-progress">{TASK_STATUS_LABELS['in-progress']}</option>
          <option value="done">{TASK_STATUS_LABELS.done}</option>

      </select>
    </div>

    <div className="task-actions">
      <button className="btn-task btn-edit"
      onClick ={handleEdit}
      title ="Edit task"
      >
        Edit
      </button>

      <button 
      className="btn-task btn-delete"
      onClick={handleDelete}
      title='Delete Task'
      >
        Delete
        </button>

    </div>

  </div>


);
};

export default TaskCard;
