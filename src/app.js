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

// --- CORS ---
const allowedOrigins = ['http://localhost:3000', 'https://nivakaran.dev'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- Routers ---
app.use('/api/auth', UserRouter);
app.use('/blogs', BlogsRouter);
app.use('/caseStudies', CaseStudiesRouter);
app.use('/contact', ContactRouter);
app.use('/miniProjects', MiniProjectRouter);
app.use('/projects', ProjectsRouter);
app.use('/subscription', SubscriptionRouter);

// --- Routes ---
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Success!' });
});

app.get('/check-cookie', (req, res) => {
    try {
        const { cookies } = req;
        if (!cookies || !cookies.token) {
            return res.status(400).json({ message: 'No cookies found!' });
        }

        const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
        res.json({ role: decoded.role, id: decoded.id });
    } catch (err) {
        console.error("Error in checking cookie:", err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/' // Important if cookie was set with a path
    });
    res.json({ message: 'Logged out successfully!' });
});

// --- 404 Handler ---
app.use((req, res) => {
    console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

// --- Error Handler (after routes) ---
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err.stack || err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
