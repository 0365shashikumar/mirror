const express = require('express');
const countriesController = require('../../controller/countries/countries.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const countries = express.Router();


countries.get('/get-countries',(req, res) => {

	countriesController.getCountries(req.query,res).then(data => res.json(data));
});


//
module.exports = countries;
