const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const smsUtility = require('../../utility/sms.utility'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const axios = require('axios');
const moment = require('moment');

class Otp {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async getOtp(req,res) {
	     
	      const requiredKeys = ['mode', 'type', 'category', 'mobile', 'email', 'name'];
            
            if ( !requiredKeys.every(key => key in req)) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing' ,columns:requiredKeys});
            }
	     
	      const {
	                mode,
                    type,
                    category,
                    mobile,
                    email,
                    name,
                } = req;
	   
        try {
            
           
            if (smsUtility.SendOtp) {
                
                const smsResponse = await smsUtility.SendOtp(mobile);
                 if (smsResponse.error) {
       
                    return res.status(500).json({ status: 500, message: 'SMS Error' });
                  }
                  
                const otp = smsResponse.otp;
               
                if(smsResponse){
                    
                    const results = await this.db.sequelize.transaction(async (t) => {
        					  const newOtp = await this.db.sms.create(
        						{
        						 mode,
                                 type,
                                 category,
                                 mobile,
                                 otp,
        						 status:1
        						},
        						 {  validate: true, transaction: t,logging: sql => logger.info(sql),  }
        					  );
        					  return newOtp;
        					});
        					
        					
        					return res.status(200).json({ status: 200, message: 'success' ,otp:otp});
                }
                
                return res.status(500).json({ status: 500, message: 'DB Error' });
                
            }else{
                
                 return res.status(404).json({ status: 404, message: 'Not Received' });
            }
            
	
        }catch (err) {
                logger.error(`Unable to find : ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500, message: err.message  });
            }

    }
    
    
    async VerifyOtp(req,res) {
	     
	      const requiredKeys = ['otp','mode', 'type', 'category', 'mobile'];
            
            if ( !requiredKeys.every(key => key in req)) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing' ,columns:requiredKeys});
            }
	     
	      const {
	                otp,
	                mode,
                    type,
                    category,
                    mobile
                } = req;
	   
        try {
            
           
                    const userSms = await this.db.sms.findOne({
                                            where: {
                                            otp,
                                            mode,
                                            type,
                                            category,
                                            mobile
                                            },
                                            order: [['id', 'DESC']], 
                                            limit: 1, // Limit the result to one row
                                            logging: sql => console.log(sql) // Log the SQL query
                                         });
                      if (!userSms) {
                            return res.status(401).json({ status: 401,token:'',message: 'OTP not found',data: [] });
                          }	
                          
                        const dateDiffInMin = Math.round(Math.abs(moment().diff(moment(userSms.created_on), 'minutes', true) * 100) / 100);
                        
                        if (dateDiffInMin <= 15  ) {
                              
                               const updateData = {
                                                    status: 0,
                                                    modified_on: new Date(),
                                                  };
                                            
                              // Update the row in the database
                              await this.db.sms.update(updateData, {
                                where: {
                                   id: userSms.id, 
                                   mobile: userSms.mobile,
                                   otp:userSms.otp
                                },
                              });
                            
                              const response = {
                                status: 200,
                                message: 'Otp verified'
                              };
                              
                               return res.status(200).json({ status: 200, message:response  }); 
                               
                            } else {
                                
                              const response = {
                                status: 500,
                                message: 'Otp expired'
                              };
                              
                              return res.status(500).json({ status: 500, message:response  }); 
                              
                            }
	
             }catch (err) {
                logger.error(`Unable to find : ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500, message: err.message  });
            }

    }


}




module.exports = new Otp();