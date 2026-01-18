const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true,
    trim:true
  },

  description:{
    type:String,
    trim:true
  },

  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },

  members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],


},{timestamps:true});

mongoose.exports = mongoose.model('Project',ProjectSchema);