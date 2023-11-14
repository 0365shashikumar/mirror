module.exports = (sequelize, DataTypes, Model) => {

    class user extends Model {}

    user.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
		  primaryKey: true,
		  autoIncrement: true
        },
        referred_by: {
          type: DataTypes.STRING,
          allowNull: false
          },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false
          },
    	  last_name: {
              type: DataTypes.STRING,
              allowNull: false
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false
          },
          mobile: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
            password: {
              type: DataTypes.STRING,
              allowNull: false
          },
            country_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
           state_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
            city_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          pincode: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
           postOfficeName: {
              type: DataTypes.STRING,
              allowNull: false
          },
            circle: {
              type: DataTypes.STRING,
              allowNull: false
          },
             district: {
              type: DataTypes.STRING,
              allowNull: false
          },
            division: {
              type: DataTypes.STRING,
              allowNull: false
          },
            region: {
              type: DataTypes.STRING,
              allowNull: false
          },
           block: {
              type: DataTypes.STRING,
              allowNull: false
          },
           dob: {
              type: DataTypes.STRING,
              allowNull: false
          },
           profile_pic: {
              type: DataTypes.STRING,
              allowNull: true
          },
            address: {
              type: DataTypes.STRING,
              allowNull: false
          },
              email_verified: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
           mobile_verified: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
           email_verification_link: {
              type: DataTypes.STRING,
              allowNull: true
          },
            email_verification_time: {
              type: DataTypes.STRING,
              allowNull: true
          },
            password_reset_string: {
              type: DataTypes.STRING,
              allowNull: true
          },
           password_reset_time: {
              type: DataTypes.STRING,
              allowNull: true
          },
           status: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
           created_on: {
              type: DataTypes.STRING,
              allowNull: true
          },
             modified_on: {
              type: DataTypes.STRING,
              allowNull: true
          },
             modified_by: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
           deleted_on: {
              type: DataTypes.STRING,
              allowNull: true
          },
           aniversary_date: {
              type: DataTypes.DATE,
              allowNull: true
          },
          
  
      }, {
        sequelize, 
        modelName: 'users',
        tableName: 'tbl_app_users', // specify table name here
        timestamps: false
      });
      
      return user;
}