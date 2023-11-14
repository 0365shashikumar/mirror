const express = require('express');
const rechargeServiceDiscount = require('../../controller/recharge/rechargeServiceDiscount.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const ServiceDiscount = express.Router();


ServiceDiscount.post('/add-discount',(req, res) => {

	rechargeServiceDiscount.mapServiesDiscount(req.body,res).then(data => res.json(data));
});

ServiceDiscount.post('/get-discount',(req, res) => {

	rechargeServiceDiscount.getRechargeServiesDiscount(req.body,res).then(data => res.json(data));
});

//
module.exports = ServiceDiscount;
