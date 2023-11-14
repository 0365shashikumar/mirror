// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class cashbackPlan extends Model {

      static async getData(plan_id) {
        try {
          const result = this.findOne({where: {id: plan_id} });
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
      }
    }

    cashbackPlan.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        plan_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        prime_rate: {
              type: DataTypes.DECIMAL,
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
          type: DataTypes.STRING,
          allowNull: false
        },
        deleted_by: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
  
      },
      {
        sequelize, 
        modelName: 'cashbackPlan',
        tableName: 'mst_recharge_cashback_plan', // specify table name here
        timestamps: false
      });
      
      return cashbackPlan;
}


