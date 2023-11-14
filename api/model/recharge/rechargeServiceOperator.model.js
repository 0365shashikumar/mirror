// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class rechargeServiceOperator extends Model {}

    rechargeServiceOperator.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        service_id:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        operator_id: {
              type: DataTypes.BIGINT,
              allowNull: false
              },
        code: {
              type: DataTypes.STRING,
              allowNull: false
          },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_on: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW
          },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        modified_on: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW
        },
        modified_by: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        deleted_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        deleted_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
  
      },
      {
        sequelize, 
        modelName: 'rechargeServiceOperator',
        tableName: 'mst_recharge_service_operator', // specify table name here
        timestamps: false
      });
      
      return rechargeServiceOperator;
}


