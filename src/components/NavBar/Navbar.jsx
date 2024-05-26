import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";


function Navbar({userInfo}) {
 
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.clear("token")
    navigate("/login");
  };


  return (
    <div className="px-7 py-2 flex items-center justify-between drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Home</h2>
      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  );
}

export default Navbar;
