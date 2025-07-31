const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const UserRouter = require('./routes/auth/auth.router');
const BlogsRouter = require('./routes/blogs/blogs.router');
const CaseStudiesRouter = require('./routes/caseStudies/caseStudies.router');
const ContactRouter = require('./routes/contact/contact.router');
const MiniProjectRouter = require('./routes/miniProjects/miniProjects.router');
const ProjectsRouter = require('./routes/projects/projects.router');
const SubscriptionRouter = require('./routes/subscription/subscription.router');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://nivakaran.dev'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle preflight OPTIONS requests
app.options('*', cors({
    origin: ['http://localhost:3000', 'https://nivakaran.dev'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Error logging middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.use('/api/auth', UserRouter);
app.use('/blogs', BlogsRouter);
app.use('/caseStudies', CaseStudiesRouter);
app.use('/contact', ContactRouter);
app.use('/miniProjects', MiniProjectRouter);
app.use('/projects', ProjectsRouter);
app.use('/subscription', SubscriptionRouter);

app.get('/', (req, res) => {
    try {
        return res.status(200).json({ message: 'Success!' });
    } catch (err) {
        console.error("Error in deployment", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/check-cookie', (req, res) => {
    try {
        if (!req.cookies || Object.keys(req.cookies).length === 0) {
            return res.status(400).json({ message: 'No cookies found!' });
        }
        
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
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