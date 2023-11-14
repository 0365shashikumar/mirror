const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const axios = require('axios');

class State {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async getState(req,res) {
        
	      const input_values = req;
	      const requiredKeys = ['country_id'];
	      
            if ( !requiredKeys.every(key => key in req)  && req[key] !== '' && req[key] !== undefined ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing' ,columns:requiredKeys});
            }
	   
        try {
            
                const statesData = await this.db.state.findAll({
                                  where: {
                                    status: 1,
                                  },
                                  order: [['name', 'ASC']],
                                });
                                    
               
                
                const countryIds = input_values.country_id.split(',').map(Number);
                
                const states = countryIds.map((countryId) => {
                                const countryStates = statesData.filter(state => state.country_id === countryId);
                                return {
                                  country_id: countryId,
                                  states: countryStates || [],
                                };
                              });
                 
                                    
                return res.status(200).json({ status: 200, message: 'success', data: states });
	
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




module.exports = new State();