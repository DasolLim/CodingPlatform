const express = require('express');
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Example protected route
router.post('/submit', authenticateToken, async (req, res) => {
    const { challengeId, code } = req.body;
    try {
        const submission = new Submission({
            userId: req.user.id,
            challengeId,
            code,
            status: 'Pending',
            createdAt: new Date(),
        });
        await submission.save();
        res.status(201).json({ message: "Code submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
