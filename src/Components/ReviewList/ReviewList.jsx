import React from "react";
import { Box, Grid } from "@material-ui/core";

import ReviewCard from "./ReviewCard";
import { timeAgo } from "../../utils/humanizetime";

const ReviewList = ({ currentReviews, placeId }) => {
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12}>
        {currentReviews.map((review) => (
          <Box key={review.id} mb={4}>
            <ReviewCard
              comment={review.body}
              rating={review.rating}
              createdAt={timeAgo(review.created_at)}
              user={review.user}
              img={review.img}
              placeId={placeId}
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ReviewList;
