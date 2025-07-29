const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register new user
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
         console.log("My server sees the JWT Secret as:", process.env.JWT_SECRET);
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.id, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};