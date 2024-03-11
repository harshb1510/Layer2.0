import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const DepositByINR = () => {
  const [userId, setUserId] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");

  const loadRazorpayScript = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {};
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpayScript();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
  }, []);

  const handleProceed = async (inrAmount) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/payment/addBooking",
        {
          rentPrice: inrAmount,
        }
      );
      console.log(response.data);
      initPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_rrpFDSyVYUuEE4",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderDetails.razorpayOrderId,
      handler: async (response) => {
        try {
          const verifyUrl = `http://localhost:8000/payment/verify`;
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(verifyUrl, verifyData);
          await axios.post("http://localhost:8000/users/sendCryptoUpi", {
            amount: data.amount,
            userId: userId
          });
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleAddMoney = async () => {
    const inrAmount = parseFloat(usdtAmount) * 82.9; 
    await handleProceed(inrAmount);
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <TextField
        label="Enter Amount in USDT"
        variant="outlined"
        value={usdtAmount}
        onChange={(e) => setUsdtAmount(e.target.value)}
      />
      <Button
        onClick={handleAddMoney}
        style={{ backgroundColor: "green", color: "white" }}
      >
        Add Money
      </Button>
    </div>
  );
};

export default DepositByINR;
