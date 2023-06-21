module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("ratings",  {
     
      userId:{
        type:Sequelize.INTEGER(11),
        field: 'userId',
        references: {
            model: 'user',
            key: 'Uid'
        }
      },
      restId:{
        type:Sequelize.INTEGER,
        field: 'restId',
        references: {
            model: 'restaurant',
            key: 'restId'
        }
      },
      ratings:{
        type:Sequelize.INTEGER,
        field:'rating',
      }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
    });
  
    return Rating;
  };