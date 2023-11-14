const express = require('express');
const stateController = require('../../controller/state/state.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const state = express.Router();


state.post('/get-state',(req, res) => {

	stateController.getState(req.body,res).then(data => res.json(data));
});


//
module.exports = state;
