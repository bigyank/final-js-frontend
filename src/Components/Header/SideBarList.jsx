import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const SideBarList = ({ Icon, text, lnk, handleLogout }) => {
  return text !== "Logout" ? (
    <ListItem button component={Link} to={lnk}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  ) : (
    <ListItem button onClick={handleLogout}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default SideBarList;
