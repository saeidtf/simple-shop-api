module.exports = (sequelize, type) => {
    return sequelize.define('sliders', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        title: type.STRING(250),        
        image: type.STRING(250),
    })
}