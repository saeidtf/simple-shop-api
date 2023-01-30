const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { errorRequest } = require("../utilities/util");

const checkToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return errorRequest(res, "No token provided", 200);
  }
  token = token.replace("Bearer ", "");
  
  jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {
    if (err) {
      return errorRequest(res, "Failed to authenticate token", 200);
    }
    const user = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
    });    

    if (!user) {
      return errorRequest(res, "No token provided", 200);
    }
    req.userId = decoded.id;    
    next();
  });
};

module.exports = {
  checkToken,
};
