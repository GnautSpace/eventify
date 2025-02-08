const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

const User = require("../models/User");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();  

const corsOptions = {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization"]
};

router.use(cors(corsOptions));  
router.use(express.json());  

router.post("/register", async (req, res) => {
    console.log("received registration request");
    const { name, email, pwd } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(pwd, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, pwd } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});


router.post('/api/auth/guest-login', (req, res) => {
    const guestUser = { userId: 'guest123', role: 'guest' };
    const token = jwt.sign(guestUser, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
});


{/*

app.post('/api/auth/reset-pwd', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:5173/reset-pwd/${resetToken}`;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click here to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.json({ message: 'Reset link sent to email' });
    });
});

app.post('/api/auth/reset-pwd/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid or expired token' });

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    });
});
*/}

module.exports = router;  
