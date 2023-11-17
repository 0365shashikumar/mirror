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

  async addMoneyRequest(filename, req, res) {
    const { user_id, amount, category, trans_no } = req;

    try {
      const filePath = filename;
      const addMoneyCount = await this.db.add_money.getCount(trans_no);
      if (addMoneyCount === 0) {
        const results = await this.insertMoneyData(user_id, amount, category, trans_no, filePath);

        //const fileUploadResult = await this.handleFileUpload(filePath);

        if (results.id > 0) {
          return res.status(200).json({ status: 200, message: 'success', data: results });
        } else {
          return res.status(500).json({ status: 500, message: 'Failed to insert data', data: [] });
        }
      }else{
        return res.status(500).json({ status: 500, message: 'Already added money of that transaction no', data: [] });
      }
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async insertMoneyData(user_id, amount, category, trans_no, filePath) {
    const moneyData = {
      user_id,
      amount,
      category,
      trans_no,
      img: filePath
    };
    return await this.db.add_money.insertData(moneyData);
  }

  async handleFileUpload(fileName) {
    try {
      const uploadPath = path.join(__dirname, '../uploads/add_money/', fileName);
      return { uploadPath, status: 'success' };
    } catch (error) {
      throw new Error(`Failed to handle file upload: ${error.message}`);
    }
  }

  handleError(err, res) {
    logger.error(`Unable to process request: ${err}`);

    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map((err) => err.message);
      res.status(500).json({ status: 500, errors: validationErrors });
    } else {
      res.status(500).json({ status: 500, message: err.message, data: [] });
    }
  }
}

module.exports = new AddMoney();