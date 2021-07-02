const Device = require('../../models/Device');
const User = require('../../models/User');

module.exports = {
    Query: {
        async getAllDevices() {
            return await Device.find({});
        },
        async getMyDevice(_, { userId }) {
            const devices = await User.findById(userId).select('devices');
            const deviceInfos = devices.devices.map((id) => {
                return Device.findById(id);
            });
            return deviceInfos;
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
