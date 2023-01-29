import React from "react";
import "./IconApp.scss";
import { Link } from "react-router-dom";

import caldera from "../../assets/images/caldera.png";
import IconoNuevoAviso from '../../assets/images/nuevo-aviso.svg'
import IconoNuevoMaterial from '../../assets/images/nuevo-material.svg'
import IconoNuevoCliente from '../../assets/images/nuevo-cliente.svg'

const IconApp = () => {
  return (
    <div className="reservas">
      <figure>
        <Link to={"/addAvisos"}>
          <img src={IconoNuevoAviso} alt="llave"></img>
        </Link>
      </figure>
      <figure>
        <Link to={"/addMaterial"}>
          <img src={IconoNuevoMaterial} alt="llave"></img>
        </Link>
      </figure>
      <figure>
        <Link to={"/addCliente"}>
          <img src={IconoNuevoCliente} alt="llave"></img>
        </Link>
      </figure>
    </div>
  );
};

export default IconApp;
