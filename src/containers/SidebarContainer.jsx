import React, { useEffect } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarContainer from "../containers/NavbarContainer";
import { connect, useSelector } from "react-redux";

const SidebarContainer = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  useEffect(() => {

  }, [isAuth])
  console.log(isAuth)
  return (
    isAuth ? (<div>
      <Sidebar />
      <NavbarContainer />
    </div>) : <Redirect to="/" />
  );
}


export default SidebarContainer