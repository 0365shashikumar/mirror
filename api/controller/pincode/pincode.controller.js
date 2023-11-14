const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const axios = require('axios');

class Pincode {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async getPincode(req,res) {
	     
	    const { pincode } = req;
	    if (!pincode) {
            return res.status(400).json({ error: 'Pass pincode' });
          }

        try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
               
                if ( response.data[0].Status=== 'Success') {
                      const postOfficeData = response.data[0].PostOffice;
                
                      if (postOfficeData) {
                        return res.status(200).json({ status: 200, message: 'Success', data: postOfficeData });
                      } else {
                        return res.status(404).json({ status: 404, message: 'Details not found', data: [] });
                      }
           
                }
       
	
        } catch (err) {
                logger.error(`Unable to find : ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500, message: err.message,data: []  });
            }

    }


}




module.exports = new Pincode();