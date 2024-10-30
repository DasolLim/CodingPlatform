const express = require('express');
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/submit', authenticateToken, async (req, res) => {
    const { challengeId, code } = req.body;
    try {
        // Mock submission evaluation logic
        const correct = true;  // Placeholder for real evaluation
        const status = correct ? 'Success' : 'Failure';

        const submission = new Submission({
            userId: req.user.id,
            challengeId,
            code,
            status,
            createdAt: new Date(),
        });
        await submission.save();
        res.status(201).json({ message: "Code submitted successfully!", status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
