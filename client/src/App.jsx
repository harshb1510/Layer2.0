import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup";
import SlotEntry from "./Pages/SlotEntry.jsx";
import SlotExit from "./Pages/SlotExit.jsx";
import NFTMint from "./Pages/nftMint.jsx";
import ClaimNft from "./Pages/claimNft.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home.jsx";



const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path ='/slotentry' element={<SlotEntry />} />
        <Route path ='/slotexit' element={<SlotExit />} />
        <Route path="/nftMint" element={<NFTMint/>} />
        <Route path="/claimNft" element={<ClaimNft/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  

  </div>
);

export default App;
