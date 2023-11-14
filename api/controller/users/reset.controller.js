const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);

class Reset {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	
    async resetPassword(req,res) {
	    
	  
            
		let results = {};
		const {
		    mobile,
		    password,
            confirmPassword
		} = req;
	
		    const requiredKeys = Object.keys({  mobile,password,confirmPassword});
            
            if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined ) ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
            }
            
            if(req.password!=req.confirmPassword){
                return res.status(500).json({ status: 500, message: 'Password & confirm password are not match' });
            }
            
        try {
                const userCount = await this.db.user.count({
                                  where: {
                                    mobile: mobile
                                  }
                                });

                if(userCount>0){
                    
                     const userRow = await this.db.user.findOne({
                                            where: {
                                            mobile: mobile
                                            },
                                            //limit: 1, // Limit the result to one row
                                            logging: sql => console.log(sql) // Log the SQL query
                                         });
                                         
                         const updateData = {       password: bcrypt.hashSync(password, 10),
                                                    modified_by: userRow.id,
                                                    modified_on: new Date(),
                                            };
                                            
                              // Update the row in the database
                           const results= await this.db.user.update(updateData, {
                                where: {
                                   id: userRow.id
                                },
                              });
              
                    
			
		
        				if (results) {
        				  return res.status(200).json({ status: 200,  message: 'Updated successfuly' });
        				} else {
        				  return res.status(500).json({ status: 500,error: 'Failed to update' });
        				}
        				
        				
                        }else{
                				  return res.status(500).json({ status: 500,error: 'Not Exist' });
                			}
                 
				
            
        } catch (error) {
            logger.error(`Unable to find user: ${error}`);
			if (error.name === 'SequelizeValidationError') {
			  const validationErrors = error.errors.map((err) => err.message);
			  return res.status(500).json({ status: 500,errors: validationErrors });
			}
			
             return res.status(500).json({ status: 500,  message: error ,data:[]});
        }
		return res.status(400).json({ status: 400,  message: 'Bad request' ,data:[]});
    }
   
	


	

	}





module.exports = new Reset();