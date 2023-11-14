const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);

class Register {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	
    async register(req,res) {
	    
	  
            
		let results = {};
		const {
		    referred_by,
		    first_name,
            last_name,
            username,
            email,
            mobile,
            password,
            country_id,
            state_id,
            city_id,
            pincode,
            postOfficeName,
            circle,
            district,
            division,
            region,
            block,
            dob,
            address,
            aniversary_date
		} = req;
	
		    const requiredKeys = Object.keys({ first_name,last_name,username,email,mobile,password });
            
            if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined) 
            // || ( (req.aniversary_date === '' || req.aniversary_date === null ||  req.aniversary_date === undefined) )
          ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
            }
            
        try {
                const userCount = await this.db.user.count({
                                  where: {
                                    mobile: mobile,
                                    email:email
                                  }
                                });

                if(userCount==0){
                    
                            const results = await this.db.sequelize.transaction(async (t) => {
        					  const newUser = await this.db.user.create(
        						{
        						referred_by,
        						first_name,
                                last_name,
                                username,
                                email,
                                mobile,
                                password:bcrypt.hashSync(password, 10),
                                country_id,
                                state_id,
                                city_id,
                                pincode,
                                postOfficeName,
                                circle,
                                district,
                                division,
                                region,
                                block,
                                dob,
                                address,
                                aniversary_date,
                                email_verified:1,
                                mobile_verified:1
        						
        						},
        						 { validate: true, transaction: t,logging: sql => logger.info(sql),  }
        					  );
        					  return newUser;
        					});
				
			
		
        				if (results) {
        				  return res.status(201).json({ status: 201,  message: 'Registration successful' ,data:results});
        				} else {
        				  return res.status(500).json({ status: 500,error: 'Failed to create' });
        				}
        				
        				
                        }else{
                				  return res.status(500).json({ status: 500,error: 'Already Exist' });
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





module.exports = new Register();