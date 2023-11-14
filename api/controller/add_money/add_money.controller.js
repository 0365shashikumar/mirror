const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const axios = require('axios');

class AddMoney {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	

    async addMoneyRequest(req,res) {
        
	      const {user_id,amount,category,trans_no,img} = req;
	       
          const requiredKeys = Object.keys({ user_id,amount,category,trans_no,img });
            
            if ( !requiredKeys.every(key => key in req)  && req[key] !== '' && req[key] !== undefined ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing' ,columns:requiredKeys});
            }
	   
        try {
            
                const addMoneyCount = await this.db.add_money.count({
                                  where: {trans_no}
                                });
                                    
               if(addMoneyCount==0){
                   const results = await this.db.sequelize.transaction(async (t) => {
        					  const newUserAddMoney = await this.db.add_money.create(
        						{
        						user_id,amount,category,trans_no,img
        						
        						},
        						 { validate: true, transaction: t,logging: sql => logger.info(sql),  }
        					  );
        					  return newUserAddMoney;
        					});
                   
                   return res.status(200).json({ status: 200, message: 'success', data: [] });
               }
                 
                return res.status(500).json({ status: 500, message: 'Failed', data: [] });
	
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




module.exports = new AddMoney();