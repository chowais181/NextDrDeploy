import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute(props) {
 
  if (localStorage.getItem("userToken")) {
    console.log(localStorage.getItem("userRole"));
    if (localStorage.getItem("userRole") === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return props.children;
}

export default PublicRoute;
