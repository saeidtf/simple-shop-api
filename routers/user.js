const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");
const jwt = require("jsonwebtoken");

const authenticateUserWithemail = (user) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({
        where: {
          email: user.email,
        },
      }).then(async (response) => {
        if (!response) {
          resolve(false);
        } else {
          if (
            !response.dataValues.password ||
            !(await response.validPassword(
              user.password,
              response.dataValues.password,
              response.dataValues.salt
            ))
          ) {
            resolve(false);
          } else {
            resolve(response.dataValues);
          }
        }
      });
    } catch (error) {
      const response = {
        status: 500,
        data: {},
        error: {
          message: "user match failed",
        },
      };
      reject(response);
    }
  });
};

const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const response = await authenticateUserWithemail(user);
    if (response) {
      const token = createToken(response);
      successRequest(res, { token }, "user login successfully", 200);
    } else {
      errorRequest(res, "user login failed 1", 400);
    }
  } catch (error) {
    console.log(error, "error");
    errorRequest(res, "user login failed 2", 400);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const findUser = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (findUser) {
      errorRequest(res, "email is duplicate", 400);
      return;
    }
    const response = await User.create(user);
    if (response) {
      const token = createToken(response);
      const data = {
        token,
        user: {
          id: response.id,
          name: response.name,
          family: response.family,
          email: response.email,
          phone: response.phone,
        },
      };

      successRequest(res, data, "user register successfully", 200);
    } else {
      errorRequest(res, "user register failed", 400);
    }
  } catch (error) {    
    errorRequest(res, "user register failed", 400);
  }
});

module.exports = router;
