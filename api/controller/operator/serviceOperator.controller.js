const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize, Model, DataTypes,Op } = require('sequelize');
const jwt = require('jsonwebtoken');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);
const multer = require('multer');

class ServicesOperator {

    db = {};

    constructor() {
        this.db = connect();
        
    }
	
	
    async addOperator(req,  res) {
	    
	  
            
		let results = {};
		const {
		    operator_name,
		    description,
            image
		} = req;
	
		    const requiredKeys = Object.keys({
                operator_name,
                description,
                image});
            
            if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined) ) {
              return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
            }
            
        try {
                const getOperator = await this.db.serviceOperator.findOne({where: {operator_name: operator_name, status:1}});

                    if(!getOperator){

                        // const storage = multer.diskStorage({
                        //     destination: (req, file, cb) => {
                        //       cb(null, './uploads')
                        //     },
                        //     filename: (req, file, cb) => {
                        //       cb(null, file.originalname)
                        //     }
                        //   });

                        //   app.post('/uploads', multer({ storage }).single('image'), async (req, res) => {
                        //     // This needs to be done elsewhere. For this example we do it here.
                        //     await sequelize.sync()
                        
                        //     const filePath = `${req.file.destination}/${req.file.filename}`
                        //     //const myModel = await MyModel.create({ filePath })
                        // });


                            const results = await this.db.sequelize.transaction(async (t) => {
        					  const newService = await this.db.serviceOperator.create(
        						{
                                    operator_name,
                                    description,
                                    image,
                                    status: 1
        						
        						},
        						 { validate: true, transaction: t,logging: sql => logger.info(sql),  }
        					  );
        					  return newService;
        					});
				
			
		
        				if (results) {
        				  return res.status(201).json({ status: 201,  message: 'Operator added successfully' ,data:results});
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
   
	
    async getOperator(req,res) {
         
          try {
              
                  const getOperator = await this.db.serviceOperator.findAll({
                                    where: {
                                      status: 1,
                                    },
                                    order: [['operator_name', 'ASC']],
                                  });
                  
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