require('dotenv').config();

const express = require('express');
const cors = require('cors'); // You already have this

const { sequelize } = require('./api/models'); 
const authRoutes = require('./api/routes/authRoutes');
const goalRoutes = require('./api/routes/goalRoutes');

const app = express();

// --- THIS IS THE CRITICAL CHANGE ---
// Configure CORS to allow requests only from your live Vercel frontend
const corsOptions = {
  origin: 'https://skill-sprint-gilt.vercel.app/', 
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
// ------------------------------------

// The rest of the middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('<h1>SkillSprint API</h1><p>Welcome to the API!</p>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});