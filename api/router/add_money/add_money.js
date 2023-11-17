const express = require('express');
const AddMoneyController = require('../../controller/add_money/add_money.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');

const { configureMulter } = require('../../utility/upload.utility'); 


const AddMoney = express.Router();
const destinationPath = './uploads/add_money/';
const fileUpload = configureMulter(destinationPath).single('img');

AddMoney.post('/add-money-request', fileUpload, async (req, res) => {
	if (req.file.fileValidationError) {
		// Handle file validation errors
		return res.status(400).json({ status: 400, error: req.fileValidationError });
	}
	const fileName = req.file.filename;
	AddMoneyController.addMoneyRequest(fileName, req.body,res).then(data => res.json(data));
});


//
module.exports = AddMoney;
