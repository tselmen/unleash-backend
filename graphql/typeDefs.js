const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date

    type User {
        id: ID!
        phoneNumber: Int!
        token: String!
        username: String!
        createdAt: Date
        devices: [ID]
    }
    type Device {
        id: ID!
        manufacturedAt: Date!
        purchasedAt: Date
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        phoneNumber: Int!
    }
    type Query {
        getAllDevices: [Device]!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        createDevice(userId: ID!): Device!
    }
`;
