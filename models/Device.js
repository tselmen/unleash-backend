const { model, Schema } = require('mongoose');

const deviceSchema = new Schema({
    purchasedAt: String,
    manufacturedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = model('Device', deviceSchema);
