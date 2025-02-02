import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Profile.css";
import UserContext from "../../context/UserContext";
import { AccountCircle } from "@mui/icons-material";
import AuthForm from "../../Components/User/AuthForm";
import { toast } from "react-toastify";
const ProfilePage = () => {

  const { userData, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    
  };
  
  return (
    <Fragment>
      {userData ?
      (
      
        <div className="container profile-container">
          <div className="user-profile">
            <AccountCircle style={{ width: "100px", height: "100px" }} />
          </div>
          <h1>Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>LogOut</button>
        </div>
    ) :(
        <AuthForm />
    )}
      
    </Fragment>
  );
};

export default ProfilePage;
