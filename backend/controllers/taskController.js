const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req,res)=>{
  try{
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const { projectId } = req.params;

     if (!title) {
      return res.status(400).json({ msg: 'Task title is required' });
    }

     const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const isMember = project.members.some(
      member => member.toString() === req.user.id
    );

      if (!isMember) {
      return res.status(403).json({ msg: 'Access denied' });
    }

     const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo: assignedTo || null,
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate: dueDate || null
    });

    await task.save();

    res.status(201).json(task);

  }catch(error){
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'username email')
      .populate('project', 'name');

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is a member of the project this task belongs to
    const project = await Project.findById(task.project._id);
    const isMember = project.members.some(
      member => member.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(task);

  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is a member of the project this task belongs to
    const project = await Project.findById(task.project);
    const isMember = project.members.some(
      member => member.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Update fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;

    await task.save();

    // Populate and return updated task
    task = await Task.findById(task._id)
      .populate('assignedTo', 'username email')
      .populate('project', 'name');

    res.json(task);

  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTasksByProject = async (req,res)=>{
try{
  const {projectId} = req.params;

  const project = await Project.findById(projectId);
  if(!project){
    return res.status(404).json({msg:'Project not found!'});
  }

  const isMember = project.members.some(
    member => member.toString()==req.user.id
  );

  if(!isMember){
    return res.status(403).json({msg:'Access denied!'});
  }

  const tasks = await Task.find({project: projectId})
  .populate('assignedTo','username email')
  .sort({createdAt: -1}); //newest first

  res.json(tasks);

}catch(error){

  console.error(error.message);
  res.status(500).json({msg:'Server error'});

}
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is a member of the project this task belongs to
    const project = await Project.findById(task.project);
    const isMember = project.members.some(
      member => member.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task deleted successfully' });

  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};