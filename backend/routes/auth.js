const express = require("express");

const authController = require("../controllers/auth");
const { authValidation } = require("../util/validation");

const router = express.Router();

router.put("/signup", authValidation, authController.signup);

router.post("/login", authController.login);

module.exports = router;
