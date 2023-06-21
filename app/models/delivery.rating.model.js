module.exports = (sequelize, Sequelize) => {
    const DeliveryRating = sequelize.define("deliveryrating", {
        dId:{
            type: Sequelize.INTEGER,
            field: 'delId'
        },
        userId:{
            type:Sequelize.INTEGER,
            field: 'userId'
            
        },
        orderId:{
            type:Sequelize.STRING,
            field: 'orderId'
        },
        month:{
            type: Sequelize.INTEGER,
            feild:'month'
        },
        rating:{
            type:Sequelize.INTEGER,
            field:'rating',
        }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
    })

    return DeliveryRating;
}