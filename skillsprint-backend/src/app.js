require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const { sequelize } = require('./api/models');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const authRoutes = require('./api/routes/authRoutes');
const goalRoutes = require('./api/routes/goalRoutes');

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const corsOptions = {
    origin: 'https://skill-sprint-gilt.vercel.app',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  app.use('/api/auth', authRoutes);
  app.use('/api/goals', goalRoutes);
]
  app.get('/', (req, res) => {
    res.send('<h1>SkillSprint API is running!</h1>');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

startServer();