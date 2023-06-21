module.exports = (sequelize, Sequelize) => {
  const order_placed = sequelize.define("order_placed", {
    orderId: {
      field: 'orderId',
      type: Sequelize.STRING,
      primaryKey: true,

    },
    deliveryUserId: {
      field: 'deliveryUserId',
      type: Sequelize.INTEGER
    },
    deliveryUserName: {
      field: 'deliveryUserName',
      type: Sequelize.STRING
    },
    restId: {
      type: Sequelize.INTEGER,
      field: 'restId',
      references: {
        model: 'restaurant',
        key: 'restId'
      }
    },
    restName: {
      type: Sequelize.STRING,
      field: 'restName'
    },

    restAddress: {
      type: Sequelize.STRING,
      field: 'restAddress'
    },
    userId: {
      type: Sequelize.INTEGER(11),
      field: 'userId',
      references: {
        model: 'user',
        key: 'Uid'
      }
    },
    userAddress: {
      type: Sequelize.STRING,
      field: 'userAddress'
    },
    total: {
      type: Sequelize.INTEGER,
      field: 'total'
    },
    dishes: {
      type: Sequelize.STRING(1024),
      field: 'dishes'
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
  });

  return order_placed;
};