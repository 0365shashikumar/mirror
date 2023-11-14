const { Sequelize, Model, DataTypes, Utils } = require("sequelize");
const logger = require('../logger/api.logger');
var env = "dev";
var config = require('./config.json');
const connect = () => {

    const hostName = config.host;
    const userName = config.username;
    const password = config.password;
    const database = config.database;
    const dialect = config.dialect;

    const sequelize = new Sequelize(database, userName, password, {
		logging: console.log,
        host: hostName,
        dialect: dialect,
        operatorsAliases: {
			$gt: Sequelize.Op.gt,
			$lt: Sequelize.Op.lt,
			$eq: Sequelize.Op.eq,
			$ne: Sequelize.Op.ne,
			// ... and so on
		  },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 5000
        }
    });
    
sequelize
  .authenticate()
  .then(() => {
    //console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

    const db = {};
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;	
	//Model
	//db.log = require("../model/log/log.model")(sequelize, DataTypes, Model);
	db.user = require("../model/user/user.model")(sequelize, DataTypes, Model);
	db.countries = require("../model/countries/countries.model")(sequelize, DataTypes, Model);
	db.state = require("../model/state/state.model")(sequelize, DataTypes, Model);
	db.city = require("../model/city/city.model")(sequelize, DataTypes, Model);
	db.city = require("../model/city/city.model")(sequelize, DataTypes, Model);
	db.sms = require("../model/sms/sms.model")(sequelize, DataTypes, Model);
	db.add_money = require("../model/add_money/add_money.model")(sequelize, DataTypes, Model);
  
  db.wallet = require("../model/wallet/wallet.model")(sequelize, DataTypes, Model);
  db.cashback = require("../model/cashback/cashback.model")(sequelize, DataTypes, Model);
  db.couponMstr = require("../model/coupon/couponMstr.model")(sequelize, DataTypes, Model);
  db.coupon = require("../model/coupon/coupon.model")(sequelize, DataTypes, Model);
  db.cashbackPlan = require("../model/cashback_plan/cashbackPlan.model")(sequelize, DataTypes, Model);
  
  db.recharge = require("../model/recharge/recharge.model")(sequelize, DataTypes, Model);
  db.rechargeServices = require("../model/recharge/rechargeServices.model")(sequelize, DataTypes, Model);
  db.serviceOperator = require("../model/operator/serviceOperator.model")(sequelize, DataTypes, Model);  
  db.rechargeServiceOperator = require("../model/recharge/rechargeServiceOperator.model")(sequelize, DataTypes, Model); 
  db.rechargeServiceDiscount = require("../model/recharge/rechargeServiceDiscount.model")(sequelize, DataTypes, Model);
  
    
  return db;

}


module.exports = {
    connect,
    env
}