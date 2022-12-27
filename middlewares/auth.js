const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Failed to authenticate token.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};


module.exports = {
    checkToken,
};