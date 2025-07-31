// api/server.js (Vercel automatically picks up functions in /api folder)
const mongoose = require('mongoose');
const app = require('../src/app'); // Adjust path as needed
const serverless = require('serverless-http');

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false;

async function connectToDB() {
  try {
    if (isConnected && mongoose.connection.readyState === 1) {
      return;
    }
    
    if (!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set');
    }
    
    await mongoose.connect(MONGO_URL, {
      bufferCommands: false, // Disable mongoose buffering for serverless
      bufferMaxEntries: 0,   // Disable mongoose buffering for serverless
    });
    
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Create the serverless handler once
const handler = serverless(app);

// Export the serverless function
module.exports.handler = async (event, context) => {
  try {
    // Important: prevent Lambda from waiting for empty event loop
    context.callbackWaitsForEmptyEventLoop = false;
    
    await connectToDB();
    
    return await handler(event, context);
  } catch (error) {
    console.error('Handler error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};