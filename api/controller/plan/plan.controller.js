const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const planUtility = require('../../utility/mplan.utility'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);

class ServicesOperator {

    db = {};

    constructor() {
        this.db = connect();
        
    }

	
    async browsePlan(req, res) {
      
      const { operator, circle } = req;
    
      const requiredKeys = Object.keys({ operator, circle });
    
      if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined)) {
        return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
      }
    
      try {
        
        if(planUtility.getPlan)
        {
            const planResponse = await planUtility.getPlan(operator, circle);

            if (planResponse.error) {
                return res.status(500).json({ status: 500, message: 'Plan Error' });
            }
        
            if(planResponse){
                //console.log(planResponse);
                return res.status(200).json({ status: 200, message: 'success' ,data:planResponse.result.records});
            }
            
            return res.status(500).json({ status: 500, message: 'DB Error' });
        }else{
            return res.status(404).json({ status: 404, message: 'Plan not Received' });
        }
        
      } catch (error) {
       
        logger.error(`Error in getPlan: ${error}`);
    
        if (error.name === 'SequelizeValidationError') {
          const validationErrors = error.errors.map((err) => err.message);
          return res.status(500).json({ status: 500, errors: validationErrors });
        }
    
        return res.status(500).json({ status: 500, message: 'Failed to create', data: [] });
      }
    
      return res.status(400).json({ status: 400, message: 'Bad request', data: [] });
    }  

}





module.exports = new ServicesOperator();