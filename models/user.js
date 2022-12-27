const bcrypt = require("bcrypt");

module.exports = (sequelize, type) => {
  const userSchema = sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(250),
      family: type.STRING(250),
      email: type.STRING(250),
      phone: type.STRING(250),
      password: type.STRING(250),      
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);            
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);            
          }
        },
      },
      instanceMethods: {
        validPassword: async function (password) {                    
          return await bcrypt.compare(password, this.password);
        },
      },
    }
  );

  userSchema.prototype.validPassword = async function (password,userPass) {
    const compare = bcrypt.compareSync(password, userPass);    
    return compare;
  };

  return userSchema;
};
