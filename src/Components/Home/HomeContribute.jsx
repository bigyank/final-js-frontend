import React from "react";
import AlternateCard from "../AlternateCard";

import img from "../../images/map.svg";
const title = "Start sharing";
const body = "Add your home on the global map and let others find you";
const btn = "Add Home";
const btnLink = "/add";
const dir = "row-reverse";

const HomeContribute = () => {
  return <AlternateCard {...{ img, title, body, btn, btnLink, dir }} />;
};

export default HomeContribute;
