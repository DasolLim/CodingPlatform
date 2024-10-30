const express = require('express');
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const authenticateToken = require('../middleware/authenticateToken');
const { VM } = require('vm2');
const router = express.Router();

// Endpoint to submit code (mock logic)
router.post('/submit', authenticateToken, async (req, res) => {
    const { challengeId, code } = req.body;
    try {
        const correct = true;  // Placeholder for real evaluation logic
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

router.post('/execute', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    // Array to capture console output
    let output = [];

    // Set up the VM with a custom console
    const vm = new VM({
        timeout: 2000,
        sandbox: {
            console: {
                log: (...args) => output.push(args.join(' ')) // Capture log output
            }
        }
    });

    try {
        // Run the code
        vm.run(code);
        res.json({ output: output.join('\n') });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
