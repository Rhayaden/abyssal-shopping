const express = require("express");

const isAuth = require("../middleware/is-auth");

const orderController = require("../controllers/order");

const router = express.Router();

router.get("/", isAuth, orderController.getOrder);
router.post("/", isAuth, orderController.postOrder);

module.exports = router;
