const express = require("express");
const router = express.Router();

const bookController = require("../controllers/dashboard.controller");
const authRoute = require("./auth.route");

router.get("/", async (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  res.render("home");
});

router.get("/dashboard", bookController.getBooks);

router.use(authRoute);

module.exports = router;
