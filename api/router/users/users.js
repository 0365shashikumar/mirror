const express = require('express');
const loginController = require('../../controller/users/login.controller');
const registerController = require('../../controller/users/register.controller');
const resetController = require('../../controller/users/reset.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const users = express.Router();


users.post('/login',(req, res) => {

	loginController.login(req.body,res).then(data => res.json(data));
});
users.post('/register',(req, res) => {

	registerController.register(req.body,res).then(data => res.json(data));
});

users.post('/reset-password',(req, res) => {

	resetController.resetPassword(req.body,res).then(data => res.json(data));
});
//
module.exports = users;
