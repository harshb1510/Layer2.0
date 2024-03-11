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



  const qrData = async (text) => {
    const deposit = JSON.parse(text);
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
    setPayableAmount(deposit.payableAmount);
    setShowModal(true);
  };

  const handlePayment = async () => {
    console.log(usdtAmount);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      senderId: user._id,
      receiverId: userId,
      amount: usdtAmount,
    };
    const response = await axios.post("http://localhost:8000/users/sendCrypto", data);
    console.log(response);
    if (response.status === 200) {
      setShowModal(false);
      history("/dashboard");
    }
  }



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
              onClick={handlePayment}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Scan;
