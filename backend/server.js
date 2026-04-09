const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

const authMiddleware = require('./middlewares/authMiddleware.js');
const projects = require('./routes/projects.js');
const tasks = require('./routes/tasks');

dotenv.config();

connectDB();

const app = express();

//CORS 
const allowedOrigins = [
  'http://localhost:5173', // React dev server
  'https://task-management-git-main-subodh-dhamalas-projects.vercel.app' // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (!allowedOrigins.includes(origin)) {
      return callback(
        new Error('The CORS policy for this site does not allow access from the specified Origin.'),
        false
      );
    }

    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Middleware
app.use(express.json());

// Health check / root
app.get('/', (req, res) => {
  res.status(200).send('ok');
});

// test protected route
app.get('/api/test/protected', authMiddleware, (req, res) => {
  res.json({
    msg: 'This is a protected route!',
    user: req.user
  });
});

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', projects);
app.use('/api', tasks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});