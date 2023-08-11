const express = require("express");
const { processPayment, sendStripeApiKey, } = require("../controllers/paymentController");
const router = express.Router();
const authenticateToken = require('../middlewares/authorization');

// payment routes
router.route("/payment/:courseId").post(authenticateToken, processPayment);
router.route("/stripeapikey").get(authenticateToken, sendStripeApiKey);

module.exports = router;