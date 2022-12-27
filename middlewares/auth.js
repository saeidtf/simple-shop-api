const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { errorRequest } = require("../utilities/util");

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return errorRequest(res, "No token provided", 403);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return errorRequest(res, "Failed to authenticate token", 500);
    }
    const user = User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });
    if (!user) {
      return errorRequest(res, "No token provided", 403);
    }
    req.userId = decoded.id;    
    next();
  });
};

module.exports = {
  checkToken,
};
