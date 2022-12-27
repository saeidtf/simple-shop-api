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
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        as: "orderItems",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
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

  const productIds = orderItems.map((x) => x.productId);
  const products = await Product.findAll({
    where: {
      id: productIds,
    },
  });

  const orderItemsToCreate = orderItems.map((x) => {
    const product = products.find((p) => p.id === x.productId);
    if (!product) {
      return {
        delete: true,
      };
    }
    return {
      productId: x.productId,
      quantity: x.quantity,
      price: product.price,
      total: x.quantity * product.price,
    };
  });

  const orderItemsNotDeleted = orderItemsToCreate.filter((x) => !x.delete);

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
    orderItemsNotDeleted.map((x) => {
      return {
        ...x,
        orderId: order.id,
      };
    })
  );

  return successRequest(res, order);
});

module.exports = router;
