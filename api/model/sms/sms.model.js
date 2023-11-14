// Define the Countries model
module.exports = (sequelize, DataTypes, Model) => {

    class sms extends Model {}

        sms.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
         mode: {
          type: DataTypes.STRING,
          allowNull: false
          },
           type: {
              type: DataTypes.STRING,
              allowNull: false
          },
           category: {
              type: DataTypes.STRING,
              allowNull: false
          },
           mobile: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
           otp: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          status: {
          type: DataTypes.INTEGER,
          allowNull: false
          },
           sms_response: {
          type: DataTypes.STRING,
          allowNull: true,
          //defaultValue: 'null', 
          },
           created_on: {
              type: DataTypes.DATE,
              allowNull: true
          },
             modified_on: {
              type: DataTypes.DATE,
              allowNull: true
          },
           deleted_on: {
              type: DataTypes.DATE,
              allowNull: true
          }
        
  
      },
      {
        sequelize, 
        modelName: 'sms',
        tableName: 'tbl_otp', // specify table name here
        timestamps: false
      });
      
      return sms;
}


