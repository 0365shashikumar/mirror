const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);

class ServicesOperator {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	
    async addOperator(filename, req, res) {
      let t;
      
      const { operator_name, description, image } = req;
    
      // const requiredKeys = Object.keys({ operator_name, description });
    
      // if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined)) {
      //   return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
      // }
    
      try {
        const filePath = filename;
        t = await this.db.sequelize.transaction();
    
        const existingOperator = await this.db.serviceOperator.findOne({ where: { operator_name: operator_name, status: 1 } });
    
        if (!existingOperator) {
          const operatorData = {
            operator_name,
            description,
            image:filePath,
            status: 1
          };
    
          const newOperator = await this.db.serviceOperator.insertData(operatorData, {
            validate: true,
            transaction: t,
            logging: sql => logger.info(sql),
          });
    
          await t.commit();
    
          return res.status(201).json({ status: 201, message: 'Operator added successfully', data: newOperator });
        } else {
          await t.rollback();
          return res.status(500).json({ status: 500, error: 'Already Exist' });
        }
      } catch (error) {
        if (t) {
          await t.rollback();
        }
    
        logger.error(`Error in addOperator: ${error}`);
    
        if (error.name === 'SequelizeValidationError') {
          const validationErrors = error.errors.map((err) => err.message);
          return res.status(500).json({ status: 500, errors: validationErrors });
        }
    
        return res.status(500).json({ status: 500, message: 'Failed to create', data: [] });
      }
    
      return res.status(400).json({ status: 400, message: 'Bad request', data: [] });
    }  
   
	
    async getOperator(req,res) {

      try {

        const getOperator = await this.db.serviceOperator.getAllData();

        return res.status(200).json({ status: 200, message: 'success', data: getOperator });

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





module.exports = new ServicesOperator();