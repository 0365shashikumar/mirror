const express = require('express');
const rechargeController = require('../../controller/recharge/recharge.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const recharge = express.Router();


recharge.post('/make-payment',(req, res) => {

	rechargeController.recharge(req.body,res).then(data => res.json(data));
});

//
module.exports = recharge;
