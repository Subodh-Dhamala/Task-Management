const Project = require('../models/Project');

exports.createProject = async (req,res)=>{
  try{
  
    const {name,description} = req.body;

    if(!name){
      return res.status(400).json({msg:'Project Name is required!'});
    }

    //create project with logged-in user as owner
    const project = new Project({
      name,
      description,
      owner:req.user.id,
      members:[req.user.id]
    })

    await project.save();

    res.status(201).json(project);

  }catch(error){

    console.log(error.message);
    res.status(500).json({msg:'Server Error! '});

  }
}

exports.getProjects= async (req,res)=>{
  try{

    const projects = await Project.find({
      members: req.user.id
    }).populate('owner','username email');

    res.json(projects);

  }catch(error){

    console.log(error.message);
    res.status(500).json({message:'Server Error !'});

  }
};