module.exports = (sequelize, Sequelize) => {
    const deliveryuser = sequelize.define("deliveryuser", {
      Uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      
      Username: {
        type: Sequelize.STRING(30)
      },
      Address: {
        type: Sequelize.STRING(150)
      },
      EmailId: {
        type: Sequelize.STRING(20),
        unique:true
      },
     
      Password: {
        type: Sequelize.STRING(150)
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,
      underscored: true
  });
  
    return deliveryuser;
  };