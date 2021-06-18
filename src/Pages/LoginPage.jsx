import React from "react";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LoginForm from "../Components/LoginForm";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    marginTop: "1.5rem",
  },
  loginStyles: {
    marginTop: "2rem",
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.loginStyles}
        container
        justify="center"
        alignContent="center"
      >
        <Grid item xs={10} md={6} lg={5}>
          <Paper className={classes.paperStyles}>
            <Box mb={2} fontWeight="fontWeightBold">
              <Typography variant="h5" component="h1" align="center">
                Welcome Back!
              </Typography>
            </Box>
            <LoginForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
