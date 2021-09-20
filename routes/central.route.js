const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  res.render("home");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

const authRoute = require("./auth.route");
router.use(authRoute);

module.exports = router;
