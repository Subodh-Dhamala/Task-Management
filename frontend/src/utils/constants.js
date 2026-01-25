export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.DONE]: 'Done',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Low',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.HIGH]: 'High',
};

export const PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: '#95a5a6',
  [TASK_PRIORITY.MEDIUM]: '#f39c12',
  [TASK_PRIORITY.HIGH]: '#e74c3c',
};

export const STATUS_COLORS = {
  [TASK_STATUS.TODO]: '#3498db',
  [TASK_STATUS.IN_PROGRESS]: '#f39c12',
  [TASK_STATUS.DONE]: '#27ae60',
};
