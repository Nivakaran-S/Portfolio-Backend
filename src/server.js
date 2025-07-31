// api/server.js (place this file in the /api folder for Vercel)
const mongoose = require('mongoose');
const serverless = require('serverless-http');

// Import your Express app
let app;
try {
  app = require('../src/app'); // Adjust this path to where your app.js file is located
} catch (error) {
  console.error('Failed to import app:', error);
  // Fallback app if import fails
  const express = require('express');
  app = express();
  app.get('*', (req, res) => {
    res.status(500).json({ 
      error: 'App import failed', 
      message: error.message 
    });
  });
}

const MONGO_URL = process.env.MONGO_URL;
let isConnected = false;

async function connectToDB() {
  try {
    // Check if already connected
    if (isConnected && mongoose.connection.readyState === 1) {
      return true;
    }
    
    // Check if MONGO_URL exists
    if (!MONGO_URL) {
      console.warn('MONGO_URL environment variable not set');
      return false;
    }
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL, {
      bufferCommands: false, // Disable mongoose buffering for serverless
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
    
    return true;
    
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    isConnected = false;
    return false;
  }
}

// Create the serverless handler
const handler = serverless(app);

// Main serverless function export
module.exports = async (req, res) => {
  console.log(`${req.method} ${req.url} - Serverless function started`);
  
  try {
    // Set response timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        console.error('Function timeout - sending 504 response');
        res.status(504).json({ 
          error: 'Gateway Timeout',
          message: 'Function execution timed out'
        });
      }
    }, 25000); // 25 second timeout
    
    // Connect to database (non-blocking)
    const dbConnected = await connectToDB();
    if (!dbConnected) {
      console.warn('Proceeding without database connection');
    }
    
    // Clear the timeout since we're about to handle the request
    clearTimeout(timeout);
    
    // Handle the request with the Express app
    return await handler(req, res);
    
  } catch (error) {
    console.error('Serverless function error:', error);
    
    // Ensure we always send a response
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date().toISOString()
      });
    }
  }
};

// Optional: Export for local development testing
module.exports.connectToDB = connectToDB;

// For local development (when running with node server.js)
if (require.main === module) {
  const http = require('http');
  const PORT = process.env.PORT || 8000;
  
  async function startLocalServer() {
    try {
      console.log('Starting local development server...');
      
      // Connect to database
      const dbConnected = await connectToDB();
      if (dbConnected) {
        console.log('Database connected for local development');
      } else {
        console.warn('Running without database connection');
      }
      
      // Create HTTP server
      const server = http.createServer(app);
      
      server.listen(PORT, () => {
        console.log(`Local server listening on port ${PORT}...`);
        console.log(`Visit: http://localhost:${PORT}`);
      });
      
      // Handle server errors
      server.on('error', (error) => {
        console.error('Server error:', error);
      });
      
    } catch (error) {
      console.error('Failed to start local server:', error);
      process.exit(1);
    }
  }
  
  startLocalServer();
}