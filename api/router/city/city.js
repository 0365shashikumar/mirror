const express = require('express');
const cityController = require('../../controller/city/city.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const city = express.Router();


city.post('/get-citys',(req, res) => {

	cityController.getCity(req.body,res).then(data => res.json(data));
});


//
module.exports = city;
