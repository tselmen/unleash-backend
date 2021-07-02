const DeviceData = require('../../models/DeviceData');

module.exports = {
    Mutation: {
        async createDeviceData(_, { deviceDataInput }) {
            const newDataEntry = new DeviceData({ ...deviceDataInput, timeStamp: new Date() });

            const res = await newDataEntry.save();

            return { ...res._doc, id: res._id };
        },
    },
    Query: {
        async getDeviceData() {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            const deviceData = await DeviceData.find({ timeStamp: { $gte: date } });
            console.log(
                deviceData.map((data) => {
                    data.timeStamp.setMinutes(0, 0, 0);
                    return data;
                }),
            );
            return deviceData;
        },
    },
};
