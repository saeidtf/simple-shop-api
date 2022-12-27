const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.get("/", async (req, res) => {
    const {page = 1, pageSize=25} = req.query;
    const products = await Product.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        exclude: ["createdAt", "updatedAt"],
    });
    return successRequest(res, products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) return errorRequest(res, "Product not found", 404);

    return successRequest(res, product);
});


module.exports = router;