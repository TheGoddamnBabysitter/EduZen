import React from "react";
import UnderConstruction from "../assets/under_construction.svg";
import "../styles/ComingSoon.css";
const Construction = () => {
  return (
    <div class="comingSoonSection">
      <img src={UnderConstruction} alt="" />
      <h1>Coming Soon</h1>
      <p>
        We are working very hard on the new version of our site. It will bring a
        lot of new features. Stay tuned!
      </p>
      <p>This page is under Development</p>
    </div>
  );
};

export default Construction;
