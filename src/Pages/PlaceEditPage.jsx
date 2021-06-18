import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PlaceForm from "../Components/PlaceForm/PlaceForm";
import LoadingIndicator from "../Components/LoadingIndicator";

import { useSelector } from "react-redux";
import { useGet } from "../hooks/useGetService";
import { usePut } from "../hooks/usePutService";

const useStyles = makeStyles((theme) => ({
  paperStyles: {
    padding: "2rem 3rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 1rem",
    },
    margin: "1.5rem 0",
  },
  loginStyles: {
    marginTop: "2rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 1rem",
    },
  },
}));

const EditPlace = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const [editable, setEditable] = useState(false);
  const classes = useStyles();
  const { mutate: postEditMutate } = usePut("editPlace");
  const getService = useGet("postDetail", id);

  const { isLoading, data } = getService({ path: `/posts/${id}` });

  // if user is not author to this place then redirect
  useEffect(() => {
    if (data && user) {
      if (data.user_id !== user.id) {
        history.push(`/place/${id}`);
      }
      setEditable(true);
    }
  }, [user, data, history, id]);

  if (isLoading || !data || !editable) return <LoadingIndicator />;

  return (
    <Grid
      className={classes.loginStyles}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={12} md={6}>
        <Paper className={classes.paperStyles}>
          <Box mb={2} fontWeight="fontWeightBold">
            <Typography variant="h5" component="h1" align="center">
              Update Place
            </Typography>
          </Box>

          <PlaceForm placeData={data} placeEdit={postEditMutate} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditPlace;
