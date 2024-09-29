import React from 'react'
import { Outlet,Navigate} from "react-router-dom";


const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem("loggedInUser") === "true";
  return isLoggedIn?<Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute
