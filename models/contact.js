module.exports = (sequelize, type) => {
    return sequelize.define('contacts', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        name: type.STRING(250),        
        email: type.STRING(250),        
        message: type.TEXT,

    })
}