// api/index.js (for Vercel serverless deployment)
const app = require('./app'); // Adjust path to your app.js
const mongoose = require('mongoose');
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
      bufferCommands: false,
    });
    
    isConnected = true;
    console.log('MongoDB connection is ready!');
  } catch (error) {
    console.error('Error connecting with MongoDB:', error);
    throw error;
  }
}

// Create handler
const handler = serverless(app);

// Export for Vercel
module.exports = async (req, res) => {
  try {
    await connectToDB();
    return await handler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// For local development, you can still use the traditional server
if (process.env.NODE_ENV !== 'production') {
  const http = require('http');
  const PORT = process.env.PORT || 8000;
  
  const startServer = async () => {
    try {
      await connectToDB();
      const server = http.createServer(app);
      server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };
  
  // Only start traditional server in development
  if (require.main === module) {
    startServer();
  }
}