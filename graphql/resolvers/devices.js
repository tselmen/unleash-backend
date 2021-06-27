const Device = require('../../models/Device');
const User = require('../../models/User');

module.exports = {
    Query: {
        async getAllDevices() {
            return await Device.find({});
        },
    },
    Mutation: {
        async createDevice(_, { userId }) {
            const newDevice = new Device({ manufacturedAt: new Date() });

            const res = await newDevice.save();

            await User.updateOne({ _id: { $eq: userId } }, { $push: { devices: res._id } });

            return { ...res._doc, id: res._id };
        },
    },
};
