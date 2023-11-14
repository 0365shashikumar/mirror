const express = require('express');
const otpController = require('../../controller/otp/otp.controller');
const authenticateJWT = require('../../middleware/authMiddleware');
//const logMiddleware = require('../../middleware/logMiddleware');



const otp = express.Router();


otp.post('/get-otp',(req, res) => {

	otpController.getOtp(req.body,res).then(data => res.json(data));
});

otp.post('/verify-otp',(req, res) => {

	otpController.VerifyOtp(req.body,res).then(data => res.json(data));
});
//
module.exports = otp;
