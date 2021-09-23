const User = require("../models/user.model");

exports.getLogin = async (req, res) => {
  try {
    res.render("auth-views/login");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

exports.getRegister = async (req, res) => {
  try {
    res.render("auth-views/register");
  } catch (error) {
    console.log(error);
  }
};

const handleErrors = async (err) => {
  let errors = {
    email: "",
    password: "",
  };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = `This email - ${err.keyValue.email} is already registered`;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });
    res.status(201).send(user);
  } catch (error) {
    const errors = await handleErrors(error);
    res.status(400).json({ errors });
  }
};
