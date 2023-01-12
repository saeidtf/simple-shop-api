const express = require("express");
const router = express.Router();
const { Slider } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.get("/", async (req, res) => {
  const sliders  = await Slider.findAll({
    attributes:{
      exclude: ["createdAt", "updatedAt"]
    }
  });
  return successRequest(res, sliders);
});

router.post("/insertBulk", async (req, res) => {
  const sliders = require("../mocks/sliders.json").map((x) => ({
    ...x,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  const result = await Slider.bulkCreate(sliders);
  return successRequest(res);
});



module.exports = router;
