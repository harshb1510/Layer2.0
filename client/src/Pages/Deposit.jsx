import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

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
    <div className="container mx-auto  p-[500px]">
      {bookingData && ( 
        <>
          <QRCode
            value={JSON.stringify(bookingData)}
            style={{ width: "200px", height: "200px" }}
          />
          <button
            onClick={() => setBookingData(null)} 
            className="mt-4  px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default Slot;
