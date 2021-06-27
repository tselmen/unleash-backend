const { model, Schema } = require('mongoose');

const deviceDataSchema = new Schema({
    temperature: {
        type: Number,
        required: true,
    },
    co: {
        type: Number,
        required: true,
    },
    humdity: {
        type: Number,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'device',
        required: true,
    },
});

module.exports = model('DeviceData', deviceDataSchema);
