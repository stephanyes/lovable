import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../../restaurant/components/general/Sidebar";
import Navbar from "../general/Navbar";
import { connect, useSelector } from "react-redux";

const SidebarContainer = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  useEffect(() => {}, [isAuth]);
  //console.log(isAuth);
  return isAuth ? (
    <div>
      <Sidebar />
      <Navbar />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default SidebarContainer;
