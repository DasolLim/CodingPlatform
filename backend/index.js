// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Import and use routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const challengeRoutes = require('./routes/challenges');
app.use('/api/challenges', challengeRoutes);

// Test route to check server status
app.get('/status', (req, res) => {
    res.send("Server is running!");
});

// MongoDB connection using URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
