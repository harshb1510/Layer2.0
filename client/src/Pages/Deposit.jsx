import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Sidebar from "../Components/Sidebar";

const Slot = () => {
  const [bookingData, setBookingData] = useState(null); 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setBookingData({
        userId: user._id,
        username: user.username,
        email: user.email,
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Sidebar/>
      {bookingData && ( 
        <div className="flex flex-col items-center">
          <QRCode
            value={JSON.stringify(bookingData)}
            style={{ width: "200px", height: "200px"}}
          />
          <button
            onClick={() => setBookingData(null)} 
            className="mt-4  px-4 py-2 hover:bg-yellow-700 w-full bg-yellow-600 text-white bg-b-900 rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Slot;
