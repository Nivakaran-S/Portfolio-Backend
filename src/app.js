const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();

app.use(
    cors({
        origin: ['*'],
        credentials: true,
    })
)

app.use(express.json())
app.use(cookieParser())


app.get('/check-cookie', (req, res) => {
    try {
        if (!req.cookies || Object.keys(req.cookies).length === 0) {
            return res.status(400).json({ message: 'No cookies found!' });
        }
        
        const token = req.cookies.token;
        const decoded = jwt.verify( token, process.env.JWT_SECRET)
    
        res.json({ role: decoded.role, id: decoded.id });
    } catch (err) {
        console.error("Error in checking cookie:", err);
        res.status(500).json({ message: 'Internal Server Error' });

    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully!' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Error: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;