const Sequelize = require('sequelize');

const getSequelize = () =>{
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './app.db',
        logging: false,        
      });      

    return sequelize;
}

module.exports = {
    getSequelize,
    Sequelize
}