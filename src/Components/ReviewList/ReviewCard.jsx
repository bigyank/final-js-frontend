import React from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { CardActions, IconButton, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";

import DialogBox from "../DialogBox";

import { useDelete } from "../../hooks/useDeleteService";
import { timeAgo } from "../../utils/humanizetime";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
    },
  },
  media: {
    height: 250,
    width: "100%",
    objectFit: "cover",
  },
  icon: {
    color: red[400],
  },
  typo: {
    marginBottom: "0.5rem",
  },
}));

export default function ReviewCard({
  createdAt,
  comment,
  img,
  user,
  placeId,
  commentId,
}) {
  const history = useHistory();
  const { user: userInfo } = useSelector((state) => state.user);
  const { mutate: mutateDeleteReview } = useDelete("deleteUser");
  const queryClient = useQueryClient();
  const classes = useStyles();

  const pointToEdit = () =>
    history.push(`/place/${placeId}/edit/review/${commentId}`);

  // for dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    mutateDeleteReview(
      { path: `/comments/${commentId}` },
      {
        onSuccess: () => {
          toast.warn("deleted sucessfully");
          queryClient.invalidateQueries("postDetail");
        },
        onError: (error) => {
          const errMessage =
            error.response && error.response.data.error
              ? error.response.data.error.message
              : error.message;

          toast.error(errMessage);
        },
      }
    );
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={"https://thispersondoesnotexist.com/image"} />}
          title={user.full_name}
          subheader={timeAgo(createdAt)}
        />
        {img && (
          <CardMedia className={classes.media} image={img} alt="user img" />
        )}
        <CardContent>{ReactHtmlParser(comment)}</CardContent>
        {userInfo.id === user.id && (
          <CardActions disableSpacing>
            <IconButton aria-label="edit review" onClick={pointToEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete review" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      <DialogBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        headerMessage="Delete this review?"
        bodyMessage=" You'll not be able to recover this review. Are you sure about this
          action?"
      />
    </Box>
  );
}
