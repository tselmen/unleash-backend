const { model } = require('mongoose');

const deviceSchema = new Schema({
    purchasedAt: String,
    manufacturedAt: {
        type: Date,
        required: true,
    },
});

module.exports = model('Device', userSchema);
