module.exports = (sequelize, type) => {
  return sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING(250),
    description: type.TEXT,
    image: {
      type: type.STRING,
      defaultValue: "/images/no-photo.jpg",
      allowNull: false,
    },
    thumbnail: {
      type: type.STRING,
      defaultValue: "/images/no-photo.jpg",
      allowNull: false,
    },
    price: type.INTEGER,
    stock: type.INTEGER,
  });
};
