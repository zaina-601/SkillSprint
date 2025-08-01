const typeDefs = `#graphql
  # A User type, but we only expose non-sensitive fields
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  # The response payload after a successful authentication
  type AuthPayload {
    token: String!
    user: User!
  }

  # Defines all the available queries (ways to fetch data)
  type Query {
    # This is a placeholder query, as we are focusing on mutations
    _empty: String
  }

  # Defines all the available mutations (ways to change data)
  type Mutation {
    # Mutation for registering a new user
    register(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload!

    # Mutation for logging in an existing user
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;