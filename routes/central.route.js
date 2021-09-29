const express = require("express");
const router = express.Router();

const bookController = require("../controllers/dashboard.controller");
const authRoute = require("./auth.route");
const { isAuthenticated, checkUser } = require("../middleware/auth.middleware");

router.get("*", checkUser);

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  res.render("home");
});

router.get("/dashboard", isAuthenticated, bookController.getBooks);

router.use(authRoute);

module.exports = router;
