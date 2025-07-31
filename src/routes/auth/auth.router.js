const {register, login} = require('./auth.controller')

const express = require('express');

const UserRouter = express.Router();


UserRouter.post('/register', register);
UserRouter.post('/login', login)

module.exports = UserRouter;