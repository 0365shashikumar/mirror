const express = require('express');
const AddMoneyController = require('../../controller/add_money/add_money.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const AddMoney = express.Router();


AddMoney.post('/add-money-request',(req, res) => {

	AddMoneyController.addMoneyRequest(req.body,res).then(data => res.json(data));
});


//
module.exports = AddMoney;
