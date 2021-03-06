import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import ExploreIcon from "@material-ui/icons/Explore";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Map from "../Components/Map";
import LoadingIndicator from "../Components/LoadingIndicator";
import { useGet } from "../hooks/useGetService";

const useStyles = makeStyles({
  stickToBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 2,
    maxWidth: 500,
  },
});

const ExplorePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("all");
  const [places, setPlaces] = React.useState([]);

  const getService = useGet("posts");
  const { isLoading, data } = getService({ path: `/posts` });

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data]);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    if (newValue === "all") return setPlaces(data);
    const filteredPlaces = data.filter((place) => place.type === newValue);
    setPlaces(filteredPlaces);
  };

  // seems like data becomes undefined just for a second after login
  if (isLoading || !data) return <LoadingIndicator />;

  return (
    <>
      <Map data={places} />
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="All"
          value="all"
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          label="Indoors"
          value="Indoors"
          icon={<AccountBalanceIcon />}
        />
        <BottomNavigationAction
          label="Outdoors"
          value="Outdoors"
          icon={<ShoppingCartIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default ExplorePage;
