const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//registration
exports.register = async (req,res)=>{

  //   console.log('=== REGISTER ROUTE HIT ===');
  // console.log('req.body:', req.body);
  // console.log('Content-Type:', req.headers['content-type'])
  
try{
  const {username,email,password} = req.body;

  if(!username || !email || !password){
    return res.status(400).json({msg:'Please enter all details!'});
  }

  let user = await User.findOne({email});
  if(user){
    return res.status(400).json({msg: 'User already exists! '});
  }

  user = await User.findOne({username});
  if(user){
    return res.status(400).json({msg:'The username is  already taken!'});
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password,salt);


  //create a new user
  user = new User({
    username,
    email,
    password: hashedPwd
  });

  await user.save();

//creating JWT Token

const payload = {
  user:{
    id: user.id
  }
};

const token =
  jwt.sign(
  payload,
  process.env.JWT_SECRET,
  {expiresIn : '1h'}
);

//send token
res.status(201).json({
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
});

}catch(error){
  console.log(error.message);
  res.status(500).json({msg:'Server Error!... '})
}
};


//login
exports.login = async (req,res)=>{
  try{
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({msg: 'Please enter all the fields!'});
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: 'Invalid Credentials!'})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({msg:'Invalid Credentials!'});
    }

    const payload = {
      user :{
        id : user.id,
      }
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );

   //send token
res.status(200).json({
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
});

  }catch(error){
    console.log(error.message);
    res.status(500).json({msg:'Server Error'});
  }
};