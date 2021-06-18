import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "./NavBar";
import SideBar from "./SideBar";

import { logout } from "../../redux/user";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const [state, setState] = useState({
    left: false,
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Nav {...{ toggleDrawer, handleLogout, isAuth }} />
      <SideBar {...{ state, toggleDrawer, handleLogout, isAuth }} />
    </div>
  );
};

export default Header;
