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
    type DeviceData {
        id: ID!
        timeStamp: Date!
        tmp: Float
        ppm: Float
        hum: Float
        wio: Boolean
        device: ID!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        phoneNumber: Int!
    }

    input DeviceDataInput {
        tmp: Float
        ppm: Float
        hum: Float
        wio: Boolean
        device: ID!
    }

    type Query {
        getAllDevices: [Device]!
        sensors: [Sensors!]!
        getMyDevice(userId: ID!): [Device]!
        getDeviceData: [DeviceData]!
    }

    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        createDevice(userId: ID!): Device!
        createDeviceData(deviceDataInput: DeviceDataInput!): DeviceData!
    }

    type SensorData {
        tmp: Float!
        hum: Float!
        ppm: Float!
        wio: Boolean!
        timeStamp: String!
    }
    type Subscription {
        subscribe2sensor(topic: String!): SensorData!
    }
    type Sensors {
        id: String!
    }
    schema {
        query: Query
        subscription: Subscription
        mutation: Mutation
    }
`;
