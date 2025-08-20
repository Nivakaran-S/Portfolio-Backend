const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const UserRouter = require('./routes/auth/auth.router');
const BlogsRouter = require('./routes/blogs/blogs.router');
const CaseStudiesRouter = require('./routes/caseStudies/caseStudies.router');
const ContactRouter = require('./routes/contact/contact.router');
const MiniProjectRouter = require('./routes/miniProjects/miniProjects.router');
const ProjectsRouter = require('./routes/projects/projects.router');
const SubscriptionRouter = require('./routes/subscription/subscription.router');
const MiniProjectCategoryRouter = require('./routes/miniProjectCategory/miniProjectCategory.router')
const ProjectCategoryRouter = require('./routes/projectCategory/projectCategory.router')
const BlogCategoryRouter = require('./routes/blogCategories/blogCategory.router')

const app = express();

// --- Manual CORS Middleware for Vercel Serverless ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://nivakaran.dev',
  'https://www.nivakaran.dev'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// --- JSON & Cookie parsing ---
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
app.use('/miniProjectCategory', MiniProjectCategoryRouter)
app.use('/projectCategory', ProjectCategoryRouter)
app.use('/blogCategory', BlogCategoryRouter)

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
        secure: true,
        sameSite: 'None',
        path: '/',
    });
    res.json({ message: 'Logged out successfully!' });
});

// --- 404 Handler ---
app.use((req, res) => {
    console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err.stack || err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
