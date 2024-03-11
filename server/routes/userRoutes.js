const express = require ("express");
const {
  loginUser,
  registerUser,
  getUser,
  sendCrypto,
  sendCryptoUpi,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/sendCrypto").post(sendCrypto);
router.route("/sendCryptoUpi").post(sendCryptoUpi);

module.exports=router;