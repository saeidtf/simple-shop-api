const express = require("express");
const { checkToken } = require("../middlewares/auth");
const router = express.Router();
const { Order, OrderItem, Product } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.get("/", checkToken, async (req, res) => {
  const { page = 1, pageSize = 25 } = req.query;
  const orders = await Order.findAndCountAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    attributes: {
      exclude: ["updatedAt"],
    },
    where: {
      userId: req.userId,
    },
  });
  return successRequest(res, orders);
});

router.get("/:id", checkToken, async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
    attributes:{
      exclude: ["status" , "userId" , "updatedAt" , "date" , "address"],
    },
    include: [
      {
        model: OrderItem,
        as: "orderItems",
        attributes: ["id", "quantity", "price", "total"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "image", "price"],
          },
        ],
      },
    ],
  });
  if (!order) return errorRequest(res, "Order not found", 404);

  return successRequest(res, order);
});

router.post("/", checkToken, async (req, res) => {
  const { orderItems, date, address } = req.body;
  if (!orderItems || orderItems.length === 0)
    return errorRequest(res, "No order items", 400);

  const productIds = orderItems.map((item) => item.productId);
  const products = await Product.findAll({
    where: {
      id: productIds,
    },
  });

  const orderItemsToCreate = orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return {
        delete: true,
      };
    }
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
      total: item.quantity * product.price,
    };
  });

  const orderItemsNotDeleted = orderItemsToCreate.filter((item) => !item.delete);

  const order = await Order.create({
    userId: req.userId,
    quantity: orderItemsNotDeleted.reduce((a, c) => a + c.quantity, 0),
    total: orderItemsNotDeleted.reduce((a, c) => a + c.total, 0),
    status: "P",
    statusTitle: "Pending",
    date: new Date(date),
    address: address,
  });

  const orderItemsCreated = await OrderItem.bulkCreate(
    orderItemsNotDeleted.map((item) => {
      return {
        ...item,
        orderId: order.id,
      };
    })
  );

  return successRequest(res, order);
});

module.exports = router;
