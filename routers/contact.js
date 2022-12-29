const express = require("express");
const router = express.Router();
const { Contact } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const contact = await Contact.create({
    name,
    email,
    message,
  });
  return successRequest(res, contact);
});

module.exports = router;
