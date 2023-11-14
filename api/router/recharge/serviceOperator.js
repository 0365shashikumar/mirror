const express = require('express');
const rechargeServicesOperator = require('../../controller/recharge/rechargeServiceOperator.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const rechargeServiceOperator = express.Router();


rechargeServiceOperator.post('/add-operator-code',(req, res) => {

	rechargeServicesOperator.mapServiesOperator(req.body,res).then(data => res.json(data));
});

rechargeServiceOperator.post('/get-operator-code',(req, res) => {

	rechargeServicesOperator.getRechargeServiesOperator(req.body,res).then(data => res.json(data));
});

//
module.exports = rechargeServiceOperator;
