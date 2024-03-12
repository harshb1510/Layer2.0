import React from 'react'
import Sidebar from '../Components/Sidebar'
import axios from 'axios';
import { useEffect } from 'react';
import Hero from '../Components/Hero';




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



  

  return (
    <div>
     <Sidebar/>
     <Hero/>
    </div>
  );
};

export default Home;
