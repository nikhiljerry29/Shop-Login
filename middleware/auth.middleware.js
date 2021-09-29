const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt exists and is verified
  if (token) {
    jwt.verify(token, process.env.SEC, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SEC, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;

        console.log("Decoded token: ", decodedToken);
      }
    });
  } else {
    res.locals.user = null;
  }
  next();
};
