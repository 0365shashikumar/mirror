const { connect } = require('../../config/db.config');
//const logger = require('../../logger/api.logger');
const { secretKey } = require('../../middleware/config'); 
const { QueryTypes,Sequelize,sequelize, Model, DataTypes,Op } = require('sequelize');
const utility = require('../../utility/utility'); 
const rechargeUtility = require('../../utility/recharge.utility'); 
const jwt = require('jsonwebtoken');
//const helper = require('../utility/helper'); 
const pino = require('pino');
const logger = pino({ level: 'info' }, process.stdout);



class Recharge {

    db = {};

    constructor() {
        this.db = connect();
        
    }


    async discountAmount(operator_type, operator_id, plan_id){
      let sql = "SELECT mst_recharge_service_discount.cashback_rate, service_rate, prime_rate from mst_recharge_service_discount join mst_recharge_panel on mst_recharge_service_discount.panel_id=mst_recharge_panel.id join mst_recharge_cashback_plan on mst_recharge_service_discount.plan_id=mst_recharge_cashback_plan.id where operator_type='"+operator_type+"' and mst_recharge_service_discount.status=1 and operator_id="+operator_id+" and plan_id="+plan_id+""
      
      return this.db.sequelize.query(sql, { type: QueryTypes.SELECT });
    }

    async recharge(req,res) {  

		  let results = {};
		  const {mobile,amount,type, operatorId, env, project_id, main_amount, ConsumerNumber} = req;
	
		  const requiredKeys = Object.keys({ mobile, amount,type, operatorId, env, project_id, main_amount, ConsumerNumber});
            
      if (!requiredKeys.every(key => key in req && req[key] !== '' && req[key] !== undefined) ) {
        return res.status(400).json({ status: 400, message: 'Required input data is missing or empty', columns: requiredKeys });
      }
      

      let t;
            
      try {
        let userId = 1;
        let user_type = 'Prime';
        let plan_id = 1;
        let date = new Date();
        let crdate = utility.formatDate(date);
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        firstDay = utility.formatDate(firstDay);
        lastDay = utility.formatDate(lastDay);
        let walletbalance = await this.db.wallet.getWalletAmount(userId);

        if(walletbalance!==null && walletbalance > 0 && walletbalance >= main_amount)
        {

          let cashback_amount = 0;
          let service_amount = 0;
          let transaction_id = 'TXN'+ Date.now();
          let wallet_amount = main_amount;
          let cashback_rate = 0;
          let service_rate = 0;
          let prime_rate = 0;

          if(!type.includes('electricity') || !type.includes('fasttag') )
          {
            let discountAmount = await this.discountAmount(type, operatorId, plan_id);
            
            if (Array.isArray(discountAmount) && discountAmount.length > 0) {
              
              discountAmount = discountAmount[0]
              Object.keys(discountAmount)?.forEach(key=>{ 
                if(key == 'cashback_rate'){
                  cashback_rate = discountAmount[key];
                }
                if(key == 'service_rate'){
                  service_rate = discountAmount[key];
                }
                if(key == 'prime_rate'){
                  prime_rate = discountAmount[key];
                }
              });
              
              
              cashback_amount = main_amount*cashback_rate/100;
              service_amount = main_amount*service_rate/100;
              
              if(user_type == 'Prime'){
                let totalMonthRecharge = await this.db.recharge.getRechargeDataForDay(userId, crdate);

                if(totalMonthRecharge !== null)
                {
                  totalMonthRecharge = totalMonthRecharge;
                }else{
                  totalMonthRecharge = 0;
                }
                
                if(totalMonthRecharge <= 5){
                  wallet_amount = main_amount*discountAmount.prime_rate/100;
                }

              } 
             
            }else{
              return res.status(500).json({ status: 500, error: 'Recharge Setup is not completed! Please try again' });
            }
          }
          let rechargePermission = 0;
          if(!type.includes('electricity') || !type.includes('fasttag') )
          {
            let electricity = await this.db.recharge.getRechargeCount(userId, firstDay, lastDay, 'electricity');
            let fasttag = await this.db.recharge.getRechargeCount(userId, firstDay, lastDay, 'fasttag');
            rechargePermission = electricity + fasttag;
          }
          t = await this.db.sequelize.transaction();
          if(rechargePermission==0)
          {
            // Recahrge Entry
            const rechargeData = { 
              ConsumerNumber: ConsumerNumber, 
              operatorId: operatorId,  
              amount: main_amount,
              type:type,
              main_amount: main_amount,
              env: env,
              project_id: project_id,
              service_rate: service_rate,
              service_amount: service_amount,
              cashback_amount: cashback_amount,
              cashback_rate: cashback_rate,
              recharge_status: 'Request Placed',
              user_id: userId,
              transaction_id: transaction_id,
              status:2
            };
            const rechargeEntry = await this.db.recharge.insert(rechargeData, { transaction: t });

            if (rechargeEntry) {
              const getAllrecharge = await this.db.recharge.getAllRechargeCount();
              
              let requestId = transaction_id + getAllrecharge;
              
              // Payboombiz
              const response = await rechargeUtility.pbms(requestId, operatorId, mobile, ConsumerNumber, main_amount );
              
              if(response.result.status == 'SUCCESS' || response.result.status == 'PROCESS')
              {
                let credit = '0.00';
                let debit = main_amount;
                let closingBalance = await this.db.wallet.getLastclosingBalance(userId);
                let openingBalance = closingBalance;
                if(closingBalance!== null && closingBalance > 0 && closingBalance>debit){
                  closingBalance = closingBalance - debit;
                }
                let tran_for = 'Main';
                let is_cashfree = 0;
                let pay_mode = 0;
                
                //entry in wallet for deduction
                const walletData = { 
                  user_id: userId, 
                  transaction_id: transaction_id,  
                  env: env,
                  type: 'Debit',
                  sub_type: null,
                  entry_for: 'Deduct',
                  opening_balance: openingBalance,
                  credit: credit,
                  debit: debit,
                  closing_balance: closingBalance,
                  tran_for: tran_for,
                  project_id: project_id,
                  is_cashfree: is_cashfree,
                  pay_mode: pay_mode
                };
                const deductionEntry = this.db.wallet.insert(walletData, { transaction: t });

                //Entry for cashback
                if(cashback_amount > 0)
                {
                  const cashbackData = { 
                    user_id: userId, 
                    transaction_id: transaction_id,  
                    env: env,
                    type: 'Credit',
                    sub_type: 'Manual',
                    for: 'cashback',
                    credit: cashback_amount,
                    tran_for: 'cashback',
                    project_id: project_id,
                    is_cashfree: is_cashfree
                  };
                  const cashbackEntry = this.db.cashback.insert(cashbackData, { transaction: t });
                }
                
                //create for coupon
                if(user_type == 'Prime' && !type.includes('electricity') || !type.includes('fasttag')){
                  let coupon_type = 'MIW';
                  let getCashbackPlan = await this.db.cashbackPlan.getData(plan_id);
                  getCashbackPlan = getCashbackPlan.dataValues;
                  
                  const couponMstr = await this.db.couponMstr.getCouponMstr(coupon_type);
                  let coupon_id = couponMstr['id'];
                  let coupon_code = coupon_type+'PRIME'+(getCashbackPlan.plan_name).toUpperCase();
                  let coupon_send_date = utility.formatDateTime(date);
                  let coupon_expire_date = utility.formatDateTime(new Date(new Date(coupon_send_date).getTime() + 60 * 60 * 24 * 1000));
                  let remaining_days = 1;
                  let applied_for = 'Cashback for prime member';

                  let order_id = 'CPN-'+userId+transaction_id;

                  const couponData = {
                    user_id:userId,
                    coupon_code:coupon_code,
                    coupon_type:coupon_type,
                    coupon_send_date:coupon_send_date,
                    coupon_expire_date:coupon_expire_date,
                    remaining_days:remaining_days,
                    coupon_used:0,
                    isScratch:0,
                    coupon_id:coupon_id,
                    applied_for:applied_for,
                    order_id:order_id,
                    redeem_amount:wallet_amount
                  }
                  
                  const couponEntry = await this.db.coupon.insert(couponData, { transaction: t });
                }

                //update in recharge for success
                const updateData = { 
                  recharge_status: response.result.status,
                  http_code: '',
                  response_code: '',
                  message: response.result.message,
                  description: response.result.message,
                  status: 1,
                  trax_id: response.result.transactionID,
                  modified_on: date.getTime(),
                  modified_by: userId,
                  panel_id: 1
                }

                const whereClause = { id:rechargeEntry.id };
                const updateRecharge = await this.db.recharge.updateData(updateData, whereClause, { transaction: t });
                
                if(updateRecharge)
                {
                  await t.commit();
                  return res.status(200).json({ status: 200,  message: 'Recharge successfully done' ,data:rechargeEntry});
                }
                await t.rollback();
              }else{
                await t.rollback()
                return res.status(500).json({ status: 500,error: 'Recharge process not completed due to some bank issue' });
              }
            }else{
              await t.rollback()
              return res.status(500).json({ status: 500,error: 'Sorry ! Please try again' });
            }
          }else{
            await t.rollback()
            return res.status(500).json({ status: 500,error: 'You have already bill payment from this account' });
          }
        }else{
            return res.status(500).json({ status: 500,error: 'You do not have sufficient wallet balance' });
        }
    
      }catch (error) {
        await t.rollback();
        logger.error(`Unable to find user: ${error}`);
        if (error.name === 'SequelizeValidationError') {
          const validationErrors = error.errors.map((err) => err.message);
          return res.status(500).json({ status: 500,errors: validationErrors });
        }
			
        return res.status(500).json({ status: 500,  message: error ,data:[]});
      }
		  return res.status(400).json({ status: 400,  message: 'Bad request' ,data:[]});
    }
   
}

module.exports = new Recharge();