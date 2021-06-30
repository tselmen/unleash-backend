const DeviceData = require('../../models/DeviceData');

module.exports = {
    Mutation: {
        async createDeviceData(_, { deviceDataInput }) {
            const newDataEntry = new DeviceData({ ...deviceDataInput, timeStamp: new Date() });

            const res = await newDataEntry.save();

            return { ...res._doc, id: res._id };
        },
    },
};
