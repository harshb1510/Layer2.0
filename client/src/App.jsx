import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup";
import Deposit from "./Pages/Deposit.jsx";
import NFTMint from "./Pages/nftMint.jsx";
import ClaimNft from "./Pages/claimNft.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home.jsx";
import Scan from "./Pages/Scan.jsx";



const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path ='/deposit' element={<Deposit />} />
        <Route path ='/scan' element={<Scan />} />
        <Route path="/nftMint" element={<NFTMint/>} />
        <Route path="/claimNft" element={<ClaimNft/>} />
      </Routes>
      <ToastContainer/>
    </Router>

  </div>
);

export default App;
