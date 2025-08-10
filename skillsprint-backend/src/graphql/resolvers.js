const { User } = require('../api/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const resolvers = {
  Mutation: {
    // Resolver for the register mutation
    register: async (_, { firstName, lastName, email, password }) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new GraphQLError('A user with this email already exists.', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // We use the SAME bcrypt logic as before
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token, user };
    },

    // Resolver for the login mutation
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new GraphQLError('Invalid credentials. User not found.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new GraphQLError('Invalid credentials. Incorrect password.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token, user };
    },
  },
};

module.exports = resolvers;