import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, TextField } from "@mui/material";

const Scan = () => {
  const history = useNavigate();
  const [userId, setUserId] = useState("");
  const [payableAmount, setPayableAmount] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  
    

  React.useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {};
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

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
          await axios.post("http://localhost:8000/users/send-Crypto",{amount:data.amount,userId:userId})
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

  const handleProceed = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/payment/addBooking",
        {
          rentPrice: data,
        }
      );
      console.log(response.data);
      initPayment(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const qrData = async (text) => {
    const deposit = JSON.parse(text);
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
    setPayableAmount(deposit.payableAmount);
    setShowModal(true);
  };

  const handlePayWithRazorpay = async () => {
    setShowModal(false);
    const inrAmount = parseFloat(usdtAmount) * 82.9; 
    await handleProceed(inrAmount);
  };

  return (
    <div className="h-[400px] w-[400px] m-auto mt-[200px]">
      <Scanner
        components={{
          audio: false,
        }}
        options={{
          delayBetweenScanSuccess: 10000,
        }}
        onResult={(text) => qrData(text)}
        onError={(error) => console.log(error?.message)}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-container bg-white fixed z-[1300]  flex items-center justify-center">
          <div className="modal-content flex flex-col justify-center items-center gap-5 p-6 ">
            <TextField
              label="Enter Amount in USDT"
              variant="outlined"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
            />
            <Button
              onClick={handlePayWithRazorpay}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Pay with Razorpay
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Scan;