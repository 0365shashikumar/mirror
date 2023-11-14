const express = require('express');
const addressController = require('../../controller/address/address.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const address = express.Router();

address.post('/get-address',(req, res) => {

	addressController.getAddress(req.body,res).then(data => res.json(data));
});

//
module.exports = address;
