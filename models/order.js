module.exports = (sequelize, type) => {
    return sequelize.define('orders', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        userId: type.INTEGER,
        quantity: type.INTEGER,
        total: type.INTEGER,
        status: type.STRING(2),
        statusTitle: type.STRING(250),
        date: type.DATE,
        address: type.STRING(250),
        
    })
}