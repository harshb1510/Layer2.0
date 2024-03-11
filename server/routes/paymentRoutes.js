const express = require("express");
const { addBooking, verifyPayment } = require("../controllers/PaymentController");


const router = express.Router();

router.route("/addBooking").post(addBooking);
router.route("/verify").post(verifyPayment);


module.exports = router;
