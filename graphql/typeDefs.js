const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        hello: String
        helloWorld: String
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
`;
