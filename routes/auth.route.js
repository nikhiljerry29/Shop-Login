const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/logout", authController.getLogout);

module.exports = router;
