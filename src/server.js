// src/server.js (or move this to api/server.js if you want Vercel to pick it up automatically)
const mongoose = require('mongoose');
const app = require('./app');
const serverless = require('serverless-http');

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false;

async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URL);
  isConnected = true;
  console.log('MongoDB connected');
}

// Export the serverless function
module.exports.handler = async (req, res) => {
  await connectToDB();
  const handler = serverless(app);
  return handler(req, res);
};
