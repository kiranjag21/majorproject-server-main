


module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define('History', {
        // Model attributes are defined here
        deliveryUserID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        orderId: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        userAddress: {
            type: Sequelize.STRING,
        },
        restName: {
            type: Sequelize.STRING
        },
        restAddress: {
            type: Sequelize.STRING
        }
    }, {
    });

    return History;

};

