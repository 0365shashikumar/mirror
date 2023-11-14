// Define the Countries model
const { Sequelize, Model, DataTypes, Op, sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes, Model) => {

    class recharge extends Model {
      static async insert(data) {
        try {
          const result = await this.create(data);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
      }

      static async updateData(data, whereClause) {
        try {
            const updateRecharge = await this.update(data, {
                where: whereClause
            });
            return updateRecharge;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
      }

      static async getRechargeCount(user_id, from_date, upto_date, type){
        const rechageCount = await this.findOne({
          attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'num']],
          where:{
              user_id:user_id,
              status:'1',
              created_on: {
                [Op.between]: [from_date, upto_date]
              },
              recharge_status: {[Op.in]: ['SUCCESS','PROCESS']},
              type: {[Op.like]: '%${'+type+'}%'}
          },
          order: [['id', 'DESC']]
        });
        return rechageCount.dataValues.num;
      }

      static async getRechargeDataForDay(user_id, targetDate) {
        const startDate = targetDate +' 00:00:00';
        const endDate = targetDate + ' 23:59:59';

        const rechargeData = await this.findOne({
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'num']],
            where: {
                user_id: user_id,
                status: '1',
                created_on: {
                    [Op.between]: [startDate, endDate]
                },
                recharge_status: { [Op.in]: ['SUCCESS', 'PROCESS'] }
            },
            order: [['id', 'DESC']]
        });

        return rechargeData.dataValues.num;
      }

      static async getAllRechargeCount(){
        const rechageCount = await this.findOne({
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'num']]
        });
        return rechageCount?.dataValues.num || 0;
      }

    }


    recharge.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        ConsumerNumber:{
            type: DataTypes.STRING,
            allowNull: false
        },
        operatorId: {
              type: DataTypes.INTEGER,
              allowNull: false
              },
        amount: {
              type: DataTypes.DOUBLE,
              allowNull: false
          },
        type: {
              type: DataTypes.STRING,
              allowNull: false
          },
        env: {
              type: DataTypes.STRING,
              allowNull: false
          },
          project_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        main_amount: {
              type: DataTypes.DOUBLE,
              allowNull: false
          },
        service_rate: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        service_amount: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        cashback_amount: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        cashback_rate:{
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        recharge_status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_on: {
          type: DataTypes.DATE,
          allowNull: true
          },
        updated_on: {
          type: DataTypes.DATE,
          allowNull: true
          },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: true
          },
        transaction_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        http_code: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        response_code: {
          type: DataTypes.STRING,
          allowNull: true
        },   
        message: {
          type: DataTypes.TEXT,
          allowNull: true
        },   
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },   
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
  
      },
      {
        sequelize, 
        modelName: 'recharge',
        tableName: 'tbl_recharge', // specify table name here
        timestamps: false
      });
      
      return recharge;
}


