const express = require('express');
const serviceController = require('../../controller/recharge/rechargeServices.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const rechargeServices = express.Router();


rechargeServices.post('/add-service',(req, res) => {

	serviceController.services(req.body,res).then(data => res.json(data));
});

rechargeServices.post('/get-service',(req, res) => {

	serviceController.getServices(req.body,res).then(data => res.json(data));
});

//
module.exports = rechargeServices;
