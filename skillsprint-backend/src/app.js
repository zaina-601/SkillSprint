const express = require('express');
const cors = require('cors');

// THIS LINE MUST BE AT THE VERY TOP
require('dotenv').config(); 

// Now we can import files that might use the .env variables
const { sequelize } = require('./api/models'); 
const authRoutes = require('./api/routes/authRoutes');
const goalRoutes = require('./api/routes/goalRoutes');

const app = express();

// Middleware
app.use(cors());
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