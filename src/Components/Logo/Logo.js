import React from "react";

import Tilt from "react-parallax-tilt";

import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
  return (
    <Tilt
      className="pa3 Tilt br2 shadow-2 ma2"
      style={{ height: 150, width: 150 }}
    >
      <img style={{ padding: "5px" }} src={brain} alt="logo" />
    </Tilt>
  );
};

export default Logo;
