// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class add_money extends Model {}

    add_money.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        user_id: {
              type: DataTypes.INTEGER,
              allowNull: false
              },
        amount: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
        status: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
        category: {
              type: DataTypes.STRING,
              allowNull: false
          },
        trans_no: {
              type: DataTypes.STRING,
              allowNull: false
          },
        img: {
          type: DataTypes.STRING,
          allowNull: false
          },
        amr_aw: {
          type: DataTypes.INTEGER,
          allowNull: true
          },
        rejection_reason: {
          type: DataTypes.STRING,
          allowNull: true
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
          }
          
          
          
          
        
  
      },
      {
        sequelize, 
        modelName: 'add_money',
        tableName: 'trans_add_money_request', // specify table name here
        timestamps: false
      });
      
      return add_money;
}


