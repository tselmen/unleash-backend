const usersResolvers = require('./users');

module.exports = {
    Query: {
        hello: () => 'Hello world!',
        helloWorld: () => 'Hello World!',
    },
    Mutation: {
        ...usersResolvers.Mutation,
    },
};
