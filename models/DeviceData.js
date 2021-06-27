const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    temperature: String,
    co: String,
    humdity: String,
    timeStamp: String,
    device: {
        type: Schema.Types.ObjectId,
        ref: 'devices',
    },
});

module.exports = model('DeviceData', userSchema);
