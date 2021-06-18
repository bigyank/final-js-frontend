import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  IconButton,
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { toggle } from "../../redux/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ toggleDrawer, handleLogout, isAuth }) => {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const [isToggled, setIsToggled] = useState(() =>
    theme === "dark" ? true : false
  );
  const classes = useStyles();

  const handleToggle = () => {
    setIsToggled((state) => !state);
    dispatch(toggle());
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.title}>
            <Grid container alignItems="center">
              <Hidden mdUp>
                <IconButton
                  aria-label="toggle-drawer"
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
              </Hidden>
              <Typography variant="h6">EarthDnD</Typography>
            </Grid>
          </Box>
          <Hidden smDown>
            {isAuth ? (
              <>
                <Switch
                  checked={isToggled}
                  onChange={handleToggle}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/explore" color="inherit">
                  Explore
                </Button>
                <Button component={Link} to="/add" color="inherit">
                  Add Place
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
