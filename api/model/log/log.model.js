module.exports = (sequelize, DataTypes, Model) => {

    class log extends Model {}

    log.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
	   method: {
          type: DataTypes.STRING,
          allowNull: false
      },
      original_url: {
          type: DataTypes.STRING,
          allowNull: false
      },
	  status: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
	  success: {
          type: DataTypes.STRING,
          allowNull: false
      },
	   response_message: {
          type: DataTypes.STRING,
          allowNull: false
      },response_header: {
            type: DataTypes.STRING,
            allowNull: true
        },
        response_body: {
            type: DataTypes.STRING,
            allowNull: true
        },
        request_body: {
            type: DataTypes.STRING,
            allowNull: true
        },request_header: {
            type: DataTypes.STRING,
            allowNull: true
        },
       
      
      
      
	
	
	
  
      }, {
        sequelize, 
        modelName: 'api_service_logs',
        tableName: 'api_service_logs', // specify table name here
        timestamps: false
      });
      
      return log;
}