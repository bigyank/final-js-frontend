import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  makeStyles,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// import DialogBox from "../DialogBox";
import AuthorTable from "./AuthorTable";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  paperStyles: {
    padding: "2rem 3rem",
    margin: "1.5rem 0",
  },
  imageStyles: {
    width: "100%",
    height: "auto",
  },
  typographyStyles: {
    padding: "0.5rem 0rem",
  },
});

const PlaceDetailHeader = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const pushToEdit = () => history.push(`/place/edit/${data.id}`);

  // for dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDelete = () => {
  //   mutateDeletePlace(data.id);
  //   setOpen(false);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box m={matches ? 4 : 0}>
      {/* <DialogBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        headerMessage="Delete this Place?"
        bodyMessage="You will not be able to recover this place. Are you sure about this action?"
      /> */}
      <Paper className={classes.paperStyles}>
        <Grid container alignContent="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={data.image}
              alt={data.title}
              className={classes.imageStyles}
            />
          </Grid>
          <Grid container item xs={12} md={6} direction="column" spacing={1}>
            <Grid item container direction="column">
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                style={{ marginBottom: "1rem" }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.typographyStyles}
                  >
                    {data.title}
                  </Typography>
                </Box>
                {user.id === data.user_id && (
                  <Box>
                    <ButtonGroup
                      variant="outlined"
                      color="secondary"
                      aria-label="place action button group"
                    >
                      <Button onClick={pushToEdit}>Edit</Button>
                      <Button onClick={handleClickOpen}>Delete</Button>
                    </ButtonGroup>
                  </Box>
                )}
              </Grid>
              <Box>
                <Divider />
              </Box>
              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                style={{ margin: "0.5em 0" }}
              >
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.typographyStyles}
                >
                  {data.type}
                </Typography>
              </Grid>
              <Divider style={{ marginBottom: "0.5em" }} />
              <Typography
                variant="subtitle1"
                className={classes.typographyStyles}
              >
                {data.body}
              </Typography>
              <AuthorTable data={data} classes={classes} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PlaceDetailHeader;
