const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'devices',
        },
    ],
});

module.exports = model('User', userSchema);
