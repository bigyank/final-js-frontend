import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";

import { usePost } from "../../hooks/usePostService";
import { usePut } from "../../hooks/usePutService";

import Editor from "./Editor";
import { toast } from "react-toastify";

const Review = ({ id, reviewMethod, commentId }) => {
  const history = useHistory();

  const { mutate: postReviewMutation } = usePost("makeReview");
  const { mutate: editReviewMutation } = usePut("makeReview");

  const [value, setValue] = useState(() => "");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleReviewSubmit = async () => {
    setSubmitting(true);
    const mutationAction =
      reviewMethod === "edit" ? editReviewMutation : postReviewMutation;

    mutationAction(
      {
        path: `/comments/${reviewMethod === "edit" ? commentId : ""}`,
        credentials: {
          body: value,
          ...(reviewMethod === "write" && { postId: id }),
        },
      },
      {
        onSuccess: () => {
          toast.info(
            reviewMethod === "write"
              ? "review added sucessfully"
              : "review edited sucessfully"
          );
          history.push(`/place/${id}`);
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
    setSubmitting(false);
  };

  return (
    <Box mt={2}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" color="secondary">
            Leave a review
          </Typography>
          <Editor {...{ value, setValue }} />
        </Grid>

        <Grid item>
          <Box>
            {isSubmitting && <LinearProgress />}
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              disabled={isSubmitting}
              onClick={handleReviewSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;
