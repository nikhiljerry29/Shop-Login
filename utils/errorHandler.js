module.exports.handleErrors = (err) => {
  let errors = {
    email: "",
    password: "",
  };

  //incorrect email
  if (err.message === "Incorrect Email") {
    errors.email = `This email is not registered`;
  }

  //incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    // duplicate error code
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
