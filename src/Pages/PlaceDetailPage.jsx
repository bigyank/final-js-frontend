import React from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGetService";
import PlaceDetailHeader from "../Components/PlaceDetail/PlaceDetailHeader";
import PlaceDetailMap from "../Components/PlaceDetail/PlaceDetailMap";
import LoadingIndicator from "../Components/LoadingIndicator";
import Review from "../Components/ReviewList/Review";
// import NotFoundPage from "./NotFoundPage";

const PlaceDetail = () => {
  const { id } = useParams();
  const getService = useGet("postDetail", id);

  const { error, isLoading, data } = getService({ path: `/posts/${id}` });

  if (error) return <p>something went wrong</p>;

  if (isLoading || !data) return <LoadingIndicator />;

  console.log(data);
  return (
    <>
      <PlaceDetailHeader data={data} />
      <PlaceDetailMap location={[data.lat, data.lon]} />
      <Review reviews={data.comments} id={id} />
    </>
  );
};

export default PlaceDetail;
