const express = require("express");
const router = express.Router();
const { Slider } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.get("/", async (req, res) => {
  const sliders  = await Slider.findAll();
  return successRequest(res, sliders);
});


module.exports = router;
