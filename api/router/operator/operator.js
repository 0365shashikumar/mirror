const express = require('express');
const operatorController = require('../../controller/operator/serviceOperator.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const serviceOperator = express.Router();


serviceOperator.post('/add-operator',(req, res) => {

	operatorController.addOperator(req.body,res).then(data => res.json(data));
});

serviceOperator.post('/get-operator',(req, res) => {

	operatorController.getOperator(req.body,res).then(data => res.json(data));
});

//
module.exports = serviceOperator;
