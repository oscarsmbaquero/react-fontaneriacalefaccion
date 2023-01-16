import React from "react";
import "./IconApp.scss";
import { Link } from "react-router-dom";
import llave from "../../assets/images/llave_inglesa.png";
import caldera from "../../assets/images/caldera.png";

const IconApp = () => {
  return (
    <div className="reservas">
      <figure>
        <Link to={"/addAvisos"}>
          <img src={llave} alt="llave"></img>
        </Link>
      </figure>
      <figure>
        <Link to={"/addMaterial"}>
          <img src={caldera} alt="llave"></img>
        </Link>
      </figure>
    </div>
  );
};

export default IconApp;
