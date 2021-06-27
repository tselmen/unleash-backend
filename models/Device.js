const { model } = require('mongoose');

const deviceSchema = new Schema({
    purchasedAt: String,
    manufacturedAt: String,
});

module.exports = model('Device', userSchema);
