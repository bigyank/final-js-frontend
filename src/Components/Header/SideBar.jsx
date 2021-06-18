import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Drawer, List } from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import SideBarList from "./SideBarList";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SideBar({ toggleDrawer, state, handleLogout, isAuth }) {
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {isAuth ? (
          <>
            <SideBarList Icon={HomeIcon} text="Home" lnk="/" />
            <SideBarList Icon={HomeIcon} text="Explore" lnk="/explore" />
            <SideBarList Icon={HomeIcon} text="Add" lnk="/add" />
            <Divider />
            <SideBarList
              Icon={ExitToAppIcon}
              text="Logout"
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <>
            <SideBarList Icon={AddToHomeScreenIcon} text="Login" lnk="/login" />
            <SideBarList
              Icon={AssignmentTurnedInIcon}
              text="Signup"
              lnk="/signup"
            />
          </>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
