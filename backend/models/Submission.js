//Submission Model
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Success', 'Failure'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    runtime: { type: Number, default: 0 }
});

module.exports = mongoose.model('Submission', submissionSchema);
