const express = require('express');
const operatorController = require('../../controller/operator/serviceOperator.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');
const { configureMulter } = require('../../utility/upload.utility'); 


const serviceOperator = express.Router();
const destinationPath = './uploads/operator/';
const fileUpload = configureMulter(destinationPath).single('image');

serviceOperator.post('/add-operator',fileUpload, async (req, res) => {
	// if (req.file.fileValidationError) {
	// 	// Handle file validation errors
	// 	return res.status(400).json({ status: 400, error: req.fileValidationError });
	// }
	const fileName = req.file.filename;
	operatorController.addOperator(fileName, req.body,res).then(data => res.json(data));
});

serviceOperator.post('/get-operator',(req, res) => {

	operatorController.getOperator(req.body,res).then(data => res.json(data));
});

//
module.exports = serviceOperator;
