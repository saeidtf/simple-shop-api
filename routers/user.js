const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { successRequest, errorRequest } = require("../utilities/util");
const jwt = require("jsonwebtoken");
const { checkToken } = require("../middlewares/auth");

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
      resolve(false);
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
      successRequest(
        res,
        {
          token,
          user: {
            id: response.id,
            name: response.name,
            family: response.family,
            email: response.email,
            phone: response.phone,
          },
        },
        "user login successfully",
        200
      );
    } else {
      errorRequest(res, "user login failed 1", 200);
    }
  } catch (error) {
    console.log(error, "error");
    errorRequest(res, "user login failed 2", 200);
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
      errorRequest(res, "email is duplicate", 200);
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
      errorRequest(res, "user register failed", 200);
    }
  } catch (error) {
    errorRequest(res, "user register failed", 200);
  }
});

router.get("/profile", checkToken, async (req, res) => {
  const user = await User.findByPk(req.userId);
  if (!user) return errorRequest(res, "User not found", 404);
  return successRequest(res, {
    id: user.id,
    name: user.name,
    family: user.family,
    email: user.email,
    phone: user.phone,
  });
});

router.put("/profile", checkToken, async (req, res) => {
  const user = await User.findByPk(req.userId);
  if (!user) return errorRequest(res, "User not found", 404);
  const { name, family, phone, password } = req.body;
  if (name) user.name = name;
  if (family) user.family = family;
  if (phone) user.phone = phone;
  if (password) user.password = password;
  await user.save();
  return successRequest(res, {
    id: user.id,
    name: user.name,
    family: user.family,
    email: user.email,
    phone: user.phone,
  });
});

module.exports = router;
