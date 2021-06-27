const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'devices',
        },
    ],
});

module.exports = model('User', userSchema);
