import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarContainer from "../containers/NavbarContainer";
import { useSelector } from "react-redux";

const SidebarContainer = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  useEffect(() => { }, [isAuth]);
  //console.log(isAuth);
  return isAuth ? (
    <div>
      <Sidebar />
      <NavbarContainer />
    </div>
  ) : (
      <Redirect to="/" />
    );
};

export default SidebarContainer;
