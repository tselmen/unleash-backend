const usersResolvers = require('./users');
const deviceResolvers = require('./devices');

module.exports = {
    Query: {
        ...deviceResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...deviceResolvers.Mutation,
    },
};
