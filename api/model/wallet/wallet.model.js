// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class wallet extends Model {
      static async insert(data) {
        try {
          const result = await this.create(data);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
      }

      async walletEntry(user_id, transaction_id, env, type, sub_type, forwallet, opening_balance, credit, debit, closing_balance, tran_for, project_id, is_cashfree, mt){
          const newUser = await this.db.wallet.create(
            {
                user_id,
                transaction_id,
                env,
                type,
                sub_type,
                for:forwallet,
                opening_balance,
                credit,
                debit,
                closing_balance,
                tran_for,
                project_id,
                is_cashfree,
                mt
            },{ validate: true, transaction: t,logging: sql => logger.info(sql),  }
          );
  
        return results;
      }

      static async getWalletAmount(user_id) {
        const credit_amount = await this.findOne({
          attributes: [
            [sequelize.fn('SUM', sequelize.col('credit')), 'amount']
          ],
          where: {
            user_id: user_id,
            status: '1',
            tran_for: 'main'
          }
        });
    
        const debit_amount = await this.findOne({
          attributes: [
            [sequelize.fn('SUM', sequelize.col('debit')), 'amount']
          ],
          where: {
            user_id: user_id,
            status: '1',
            tran_for: 'main'
          }
        });
    
        const cr_amount = credit_amount?.dataValues.amount || 0;
        const dr_amount = debit_amount?.dataValues.amount || 0;
        return cr_amount - dr_amount;
      }

      static async getLastclosingBalance(user_id)
      {
          const closingBalance = await this.findOne({
            attributes: ['closing_balance'],
            where:{
                user_id:user_id,
                status:'1',
                tran_for: 'main'
            },
            order: [['id', 'DESC']],
            raw: true,
            nest:true
          });
          return closingBalance.closing_balance;
      }

      

    }

    wallet.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        transaction_id: {
              type: DataTypes.INTEGER,
              allowNull: false
              },
        env: {
              type: DataTypes.STRING,
              allowNull: false
          },
        type: {
              type: DataTypes.STRING,
              allowNull: false
          },
        sub_type: {
              type: DataTypes.STRING,
              allowNull: true
          },
          for: {
            type: DataTypes.STRING,
            allowNull: false
        },
        opening_balance: {
              type: DataTypes.DOUBLE,
              allowNull: false
          },
        credit: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        debit: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        closing_balance: {
          type: DataTypes.DOUBLE,
          allowNull: false
          },
        tran_for:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        project_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_on: {
          type: DataTypes.DATE,
          allowNull: true
          },
        created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
        },
        modified_on: {
          type: DataTypes.DATE,
          allowNull: true
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
        deleted_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_cashfree: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mt: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
          
          
          
        
  
      },
      {
        sequelize, 
        modelName: 'wallet',
        tableName: 'tbl_wallet', // specify table name here
        timestamps: false
      });
      
      return wallet;
}


