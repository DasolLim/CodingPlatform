// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    solvedChallenges: [{ challengeId: String, solvedAt: Date }]
});

module.exports = mongoose.model('User', userSchema);
