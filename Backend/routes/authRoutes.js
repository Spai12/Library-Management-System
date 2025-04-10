const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 🔹 Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();

        console.log('User registered:', user);
        res.json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).send('Server error');
    }
});

// 🔹 Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        console.log("Token Generated:", token);
        res.json({ token });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
