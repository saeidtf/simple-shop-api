const { getSequelize, Sequelize } = require("./config");
const sequelize = getSequelize();

const Product = require("./product")(sequelize, Sequelize);
const Order = require("./order")(sequelize, Sequelize);
const OrderItem = require("./orderItem")(sequelize, Sequelize);
const User = require("./user")(sequelize, Sequelize);
const Slider = require("./slider")(sequelize, Sequelize);
const Contact = require("./contact")(sequelize, Sequelize);

Order.belongsTo(User, { foreignKey: "userId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });
User.hasMany(Order, { foreignKey: "userId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });


sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = {
    sequelize,
    Sequelize,
    Product,
    Order,
    OrderItem,
    User,
    Slider,
    Contact
}
