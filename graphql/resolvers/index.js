const usersResolvers = require('./users');
const deviceResolvers = require('./devices');
const deviceDataResolvers = require('./deviceDatas');

module.exports = {
    Query: {
        ...deviceResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...deviceResolvers.Mutation,
        ...deviceDataResolvers.Mutation,
    },
};
