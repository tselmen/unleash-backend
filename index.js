const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 4000;

const app = express();

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        helloWorld: () => 'Hello World!'
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose
    .connect('mongodb://localhost:27017/unleash', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected!");
        return app.listen({ port: PORT }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
        )})
    .catch(error => {
        console.error(error)
    })
