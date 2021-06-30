const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

const httpServer = createServer(app);

server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

mongoose
    .connect('mongodb://localhost:27017/unleash', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected!');
        return httpServer.listen({ port: PORT }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
        );
    })
    .catch((error) => {
        console.error(error);
    });
