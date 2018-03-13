const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');
const GraphQLJSON = require('graphql-type-json');

// mutation: put patch delete post schema data
// query: get schema data
// type: schema data collections

// resolvers handle the querys to mongo for each mutation / query

const typeDefs = `

  scalar JSON

  type Query {
    user: User
    properties: [Property]
  }

  type Mutation {
    localSignup(input: AuthFormInput!): User
    localLogin(input: AuthFormInput!): User
    resetPassword(token: String!): User
    saveProperty(input: NewPropertyInput!): Property
    propertyMakePayment(propertyID: ID!, stripe: StripeInput!): Property
    flowUpdate(propertyID: ID!, step: Int!, values: JSON!): Property
  }

  type User {
    _id: ID!
    _oAuthId: String
    password: String
    resetPasswordToken: String
    resetPasswordExpires: String
    email: String
    properties: [Property]
  }


  type Property {
    _id: ID!
    address: String!
    googleData: JSON!,
    compliance: JSON!,
    _user: User!,
    status: String!
  }


  input NewPropertyInput {
    googleData: JSON!
    unitNumber: String
    host: String!
  }

  input AuthFormInput {
    email: String!
    password: String!
  }

  input StripeInput {
    amount: Float!
    description: String!
    tokenID: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
