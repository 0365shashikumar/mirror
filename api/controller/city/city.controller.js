const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const axios = require('axios');

class City {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async getCity(req,res) {
	      const input_values = req;
	       const requiredKeys = ['country_id', 'state_id'];
            
            if ( !requiredKeys.every(key => key in req)  && req[key] !== '' && req[key] !== undefined ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing' ,columns:requiredKeys});
            }
	   
        try {
            
                const cityData = await this.db.city.findAll({
                                  where: {
                                    flag: 1,
                                  },
                                  order: [['name', 'ASC']],
                                });
                                    
               
                const countryIds = input_values.country_id.split(',').map(Number);
                const stateIds = input_values.state_id.split(',').map(Number);
                
                const citys = countryIds.map((countryId) => {
                                const citiesData = cityData.filter(state => state.country_id === countryId && stateIds.includes(state.state_id) );
                                return {
                                  state_id: stateIds,
                                  city: citiesData || [],
                                };
                              });
                 
                                    
                return res.status(200).json({ status: 200, message: 'success', data: citys });
	
        }catch (err) {
                logger.error(`Unable to find : ${err}`);
    			if (err.name === 'SequelizeValidationError') {
    			  const validationErrors = err.errors.map((err) => err.message);
    			  return res.status(500).json({ status: 500,errors: validationErrors });
    			}
    			 return res.status(500).json({ status: 500, message: err.message,data: []  });
            }

    }


}




module.exports = new City();