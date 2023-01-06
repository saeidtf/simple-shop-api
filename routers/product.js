const express = require("express");
const router = express.Router();
const { Product, OrderItem, sequelize, Sequelize } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.post("/insertBulk", async (req, res) => {
  const products = require("../mocks/products.json").map((x) => ({
    ...x,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await Product.destroy({ truncate: true, cascade: true });
  await Product.bulkCreate(products);
  return successRequest(res, "Insert success");
});

router.get("/", async (req, res) => {
  const { page = 1, pageSize = 25, q } = req.query;
  let where = {};
  if (q) {
    where = {
      name: {
        [Sequelize.Op.like]: `%${q}%`,
      },
    };
  }
  const products = await Product.findAndCountAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return successRequest(res, products);
});

router.get("/bestSeller", async (req, res) => {
  const { limit = 10 } = req.query;
  const countOrders = await OrderItem.findAll({
    attributes: [
      "productId",
      [sequelize.fn("COUNT", sequelize.col("productId")), "sold"],
    ],
    group: ["productId"],
    order: [[sequelize.fn("COUNT", sequelize.col("productId")), "DESC"]],
    limit,
  });
  let productIds = countOrders.map((product) => product.productId);
  if (!productIds.length) {
    productIds =await Product.findAll({
      attributes: ["id"],
      limit,
      raw:true
    })
    productIds = productIds.map(x=>x.id)
  }

  const products = await Product.findAll({
    where: {
      id: productIds,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  return successRequest(res, products);
});

router.get("/newest", async (req, res) => {
  const { limit = 10 } = req.query;
  const products = await Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["createdAt", "DESC"]],
    limit,
  });
  return successRequest(res, products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!product) return errorRequest(res, "Product not found", 404);

  return successRequest(res, product);
});

module.exports = router;
