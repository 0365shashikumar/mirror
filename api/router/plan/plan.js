const express = require('express');
const planController = require('../../controller/plan/plan.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const mplan = express.Router();


mplan.post('/get-plan',(req, res) => {

	planController.browsePlan(req.body,res).then(data => res.json(data));
});

//
module.exports = mplan;
