import React from "react";
import { Box, Typography } from "@material-ui/core";

import Cards from "./CardSlider";
import LoadingIndicator from "../LoadingIndicator";
import { useGet } from "../../hooks/useGetService";

const BestPlace = () => {
  const placeService = useGet("places");
  const { isLoading, isError, data } = placeService({ path: "/posts" });

  if (isLoading) return <LoadingIndicator />;
  if (isError) return null;

  return (
    <Box mb={4}>
      <Box px={2}>
        {data.length > 0 && (
          <Typography variant="h5">Your Next Home</Typography>
        )}
      </Box>
      <Cards editorData={data} />
    </Box>
  );
};

export default BestPlace;
