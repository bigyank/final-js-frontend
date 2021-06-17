import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography, Paper, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Review from "../Components/CreateReview/Review";
import LoadingIndicator from "../Components/LoadingIndicator";
import { useGet } from "../hooks/useGetService";

const useStyles = makeStyles((theme) => ({
  reviewStyles: {
    width: "60%",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      padding: "1rem",
    },
  },
  imageStyles: {
    width: "100%",
    height: "auto",
  },
}));

function PlaceReviewPlace() {
  console.log("review");
  const { id, action, commentId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // if action is other than write or edit, redirect
  useEffect(() => {
    if (action !== "write" && action !== "edit") history.push("/");
  }, [action, history]);

  const getService = useGet("postDetail", id);
  const { isLoading, data } = getService({ path: `/posts/${id}` });

  if (isLoading || !data) return <LoadingIndicator />;

  return (
    <Box mx={matches ? 4 : 0} my={2}>
      <Grid container justify="center">
        <Paper className={classes.reviewStyles}>
          <Grid container justify="flex-start" spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                src={data.image}
                alt={data.title}
                className={classes.imageStyles}
              />
            </Grid>
            <Grid item>
              <Typography variant={matches ? "h5" : "h6"}>
                {data.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {data.type}
              </Typography>
            </Grid>
          </Grid>
          <Box m={2}>
            <Divider />
          </Box>
          <Review id={id} reviewMethod={action} commentId={commentId} />
        </Paper>
      </Grid>
    </Box>
  );
}

export default PlaceReviewPlace;
