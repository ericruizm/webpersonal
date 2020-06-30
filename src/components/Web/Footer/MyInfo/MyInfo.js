import React from "react";
import LogoWhite from "../../../../assets/img/png/original.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Eric Ruiz" />
      <h4>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </h4>
      <SocialLinks />
    </div>
  );
}
