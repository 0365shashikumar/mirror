const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);

class Login {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async login(req,res) {
	     
	    const { username, password } = req;
	  

        try {
                            const userRow = await this.db.user.findOne({
                                            where: {
                                            username: username
                                            },
                                            //limit: 1, // Limit the result to one row
                                            logging: sql => console.log(sql) // Log the SQL query
                                         });
                      if (!userRow) {
                            return res.status(401).json({ status: 401,token:'',message: 'User not found',data: [] });
                          }	
                          
              const passwordMatch = await bcrypt.compare(password, userRow.password);
              if (passwordMatch) {
                          const userData = { 
                              id: userRow.id, 
                              first_name: userRow.first_name,  
                              last_name: userRow.last_name,
                              username: userRow.username,
                              email: userRow.email,
                              mobile: userRow.mobile,
                              refered_by: userRow.refered_by,
                              country: userRow.country,
                              state: userRow.state,
                              circle: userRow.circle,
                              district: userRow.district,
                              division: userRow.division,
                              region: userRow.region,
                              block: userRow.block,
                              pincode: userRow.pincode,
                              address: userRow.address,
                              dob: userRow.dob
                            };
                          const token = jwt.sign(userData, 'secretkey', { expiresIn: '1h' });
                          return res.status(200).json({ status: 200, token: token, message: 'Login successful', data: userData });
                        } else {
                          return res.status(401).json({ status: 401, token: '', message: 'Invalid password', data: [] });
                    }
                    
                    
          
    		 
    		 
           
        }
        catch (err) {
                logger.error(`Unable to find user: ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500,token:'', message: err,data: []  });
            }
	


    }
    
    
    async referralDetails(req,res) {
	     
	    const { referral_id } = req;
	  

        try {
                            const userRow = await this.db.user.findOne({
                                            where: {
                                            referred_by: referral_id
                                            },
                                            //limit: 1, // Limit the result to one row
                                            logging: sql => console.log(sql) // Log the SQL query
                                         });
                      if (!userRow) {
                            return res.status(401).json({ status: 401,token:'',message: 'User not found',data: [] });
                          }	
                          
             
        }
        catch (err) {
                logger.error(`Unable to find user: ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500,token:'', message: err,data: []  });
            }
	


    }


}




module.exports = new Login();