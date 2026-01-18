const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authMiddleware = require('./middlewares/authMiddleware.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello World!");
});

app.get('/api/test/protected',authMiddleware,(req,res)=>{
  res.json({
    msg:'This is a protected route!',
    user:req.user
  });
});


//routes
app.use('/api/auth/',require('./routes/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
