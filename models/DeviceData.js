const { model, Schema } = require('mongoose');

const deviceDataSchema = new Schema({
    tmp: {
        type: Number,
        required: true,
    },
    ppm: {
        type: Number,
        required: true,
    },
    hum: {
        type: Number,
        required: true,
    },
    wio: {
        type: Boolean,
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
