// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class serviceOperator extends Model {}

    serviceOperator.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        operator_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
              type: DataTypes.TEXT,
              allowNull: false
              },
        image: {
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
        modelName: 'serviceOperator',
        tableName: 'mst_service_operator', // specify table name here
        timestamps: false
      });
      
      return serviceOperator;
}


