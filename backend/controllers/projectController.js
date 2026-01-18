const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project Name is required!" });
    }

    //create project with logged-in user as owner
    const project = new Project({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id],
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error! " });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    .populate('owner','username email')
    .populate('members','username email');

    if(!project){
      return res.status(404).json({msg: 'Project not found!'});
    }

    const isMember = project.members.some(
      member => member._id.toString() === req.user.id
    );

    if(!isMember){
      return res.status(403).json({msg: 'Access Denied!'});
    }

    res.json(project)

  } catch (error) {
    console.log(error.message);
    if(error.kind === 'ObjectId'){
      return res.status(404).json({msg: 'Project not found! '});
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProject = async (req,res)=>{
try{
  const {name,description} = req.body;

  let project = await Project.findById(req.params.id);

  if(!project){
    return res.status(404).json({msg: 'Project not found!'});
  }

  //check if user is the owner

  if(project.owner.toString() != req.user.id){
    return res.status(403).json({ msg: 'Only project owner can update' });
  }

  // Update fields
    if (name) project.name = name;
    if (description !== undefined) project.description = description;

    await project.save();

    res.json(project);

}catch(error){
 console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user is the owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Only project owner can delete' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Project deleted successfully' });

  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("owner", "username email");

    res.json(projects);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error !" });
  }
};
