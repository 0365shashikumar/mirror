	const smsModule = require('../config/sms.config');
	const axios = require('axios');
	const crypto = require('crypto');
	const smsConfig = smsModule.sms();
	
	function generateOTP() {

         let otp = '000000'; 
        
          while (otp.replace(/0/g, '').length < 4) {
            // Generate a new OTP
            otp = crypto.randomBytes(3).toString('hex');
            otp = otp.replace(/[^0-9]/g, '').padStart(6, '0');
          }
        
          return otp;
        }

	
	function SendOtp(mobileNo){
	   
			return new Promise((resolve, reject) => {
			    
			    
			const url = smsConfig.sms_url;
            const user = smsConfig.username;
            const password = smsConfig.password;
            const mobilenumbers = mobileNo;
            const senderid = smsConfig.senderid;
            const messagetype = smsConfig.messagetype;
            const otp = generateOTP();
            
            const sms_data = {
              sms: `${otp} is your verification code. Please do not share it with anyone. ${smsConfig.company}`
            };
            
            
            const message = encodeURIComponent(sms_data.sms);
            
            const data = `User=${user}&passwd=${password}&mobilenumber=${mobilenumbers}&message=${message}&sid=${senderid}&mtype=${messagetype}`;
            
            axios.post(url, data, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              httpsAgent: { rejectUnauthorized: false }, // To disable SSL verification
            })
              .then((response) => {
                console.log(otp); // Handle the response data as needed
                resolve({ data: response.data, otp }); 
               
              })
              .catch((error) => {
                console.log(error);
                 reject(error); 
              });
              
			});
			
		}
			
	

module.exports = {
  SendOtp
};