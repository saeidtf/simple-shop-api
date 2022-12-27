module.exports = (sequelize, type) => {
    return sequelize.define('orderItems', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        orderId: type.INTEGER,
        productId: type.INTEGER,
        quantity: type.INTEGER,
        price: type.INTEGER,
        total: type.INTEGER,        
    })
}