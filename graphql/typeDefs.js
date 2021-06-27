const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        hello: String
        helloWorld: String
    }
    type User {
        id: ID!
        phoneNumber: Int!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        phoneNumber: Int!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`;
