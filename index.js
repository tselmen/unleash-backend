const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose
    .connect('mongodb://localhost:27017/unleash', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected!');
        return app.listen({ port: PORT }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
        );
    })
    .catch((error) => {
        console.error(error);
    });
