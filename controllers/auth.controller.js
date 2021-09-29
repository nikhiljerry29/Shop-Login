const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const { handleErrors } = require("../utils/errorHandler");

const maxAge = 60; // in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SEC, {
    expiresIn: maxAge,
  });
};

exports.getLogin = async (req, res) => {
  try {
    res.render("auth-views/login");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.getRegister = async (req, res) => {
  try {
    res.render("auth-views/register");
  } catch (error) {
    console.log(error);
  }
};

exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
