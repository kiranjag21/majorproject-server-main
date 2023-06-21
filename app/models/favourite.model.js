module.exports = (sequelize, Sequelize) => {
    const favourite = sequelize.define("favourite",  {
        favouriteId:{
          field: 'favouriteId',
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },

      userId:{
        type:Sequelize.INTEGER,
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
      dishId:{
        type:Sequelize.INTEGER,
        field: 'dishId',
        references: {
            model: 'dish',
            key: 'dishId'
        }
      }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
    });
  
    return favourite;
  };