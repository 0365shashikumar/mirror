// Define the Countries model
const { Sequelize, Model, DataTypes, Op, sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes, Model) => {

    class panel extends Model {
        static async getAllData() {
            try {
              const result = await this.findAll({
                  where: {
                    status: 1,
                  },
                  order: [['priority', 'ASC']]
                });
                return result;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
          }
    }


    panel.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        service_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        service_url: {
              type: DataTypes.STRING,
              allowNull: false
              },
        callback_url: {
              type: DataTypes.STRING,
              allowNull: false
          },
        status_code: {
              type: DataTypes.STRING,
              allowNull: false
          },
        error_message: {
              type: DataTypes.STRING,
              allowNull: false
          }, 
        created_on: {
          type: DataTypes.DATE,
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
        priority: {
          type: DataTypes.INTEGER,
          allowNull: true
        },   
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
  
      },
      {
        sequelize, 
        modelName: 'panel',
        tableName: 'mst_recharge_panel', // specify table name here
        timestamps: false
      });
      
      return panel;
}


