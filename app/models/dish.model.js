module.exports = (sequelize, Sequelize) => {
    const dish = sequelize.define("dish",  {
      dishId:{
          field: 'dishId',
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      dishName: {
        field: 'dishName',
        type: Sequelize.STRING
      },
      restId:{
        type:Sequelize.INTEGER,
        field: 'restId',
        references: {
            model: 'restaurant',
            key: 'restId'
        }
      },
      price:{
        field: 'price',
        type:Sequelize.INTEGER,
      },
      category: {
        field: 'category',
        type: Sequelize.STRING
      },
      imageAddress: {
        field:'imageAddress',
        type: Sequelize.STRING
      }
      ,
      rating: {
        field:'rating',
        type: Sequelize.INTEGER
      }
     },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
    });
  
    return dish;
  };