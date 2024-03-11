import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    const getUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await axios.get("http://localhost:8000/users/getUser", {
        headers: {
          "x-auth-token": user._id,
        },
      });
      console.log(data.data.user);
    };
    getUser();
  }, []);

  return <div>Hello</div>;
};

export default Home;
