const http = require('http');
const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL


const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!')
})

mongoose.connection.on('error', (err) => {
    console.log('Error connecting with MongoDB: ', err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL)

    server.listen(PORT, () => {
        console.log(`Listenining on port ${PORT}...`)
    })
}

startServer()
