const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({
      token,
      user,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExists) {
    res.status(404).json({ messsage: "Username or Email Already Exist" });
  } else {
    const user = await User.create({ userName, fullName, email, password });
    if (user) {
      res.status(201).json({
        Success: "User Registered Successfully!",
      });
    } else {
      res.status(400);
    }
  }
};

const getUser = async (req, res) => {
  const userId = req.headers["x-auth-token"];
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).send({ user });
    }
  } else {
    return res.status(401).send({ error: "User Not Found...!" });
  }
};

const sendCrypto = async (req, res) => {
  const { amount, receiverId } = req.body;
  const senderId = req.body.senderId;
  const sender = await User.findOne({ _id: senderId });
  if (sender.wallet >= amount) {
    const receiver = await User.findOne({ _id: receiverId });
    if (receiver) {
      receiver.wallet += amount;
      sender.wallet -= amount;
      await receiver.save();
      await sender.save();
      res.status(200).send({ message: "Transaction Successful" });
    } else {
      res.status(404).send({ message: "Receiver Not Found" });
    }
  }
}

const sendCryptoUpi = async (req, res) => {
  const { amount, userId } = req.body;
  const user = await User.findOne({ _id: userId });
  if (user) {
    user.wallet += amount;
    await user.save();
    res.status(200).send({ message: "Transaction Successful" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
}


module.exports = {
  loginUser,
  registerUser,
  getUser,
  sendCrypto,
  sendCryptoUpi,
};
