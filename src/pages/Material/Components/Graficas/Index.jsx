import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./Graficas.scss";

const index = ({ materialAveriado, materialOperativo }) => {
  return (
    <div className="graficas_container">
      <div className="graficas">
        <h1>Averiado</h1>
        <CircularProgressbar
          styles={buildStyles({
            pathColor:
              materialAveriado > 80
                ? "#DC2626"
                : materialAveriado < 80 && materialAveriado > 50
                ? "#d8f007"
                : "#35de0b",
            trailColor: "#F5C5F1",
            textColor: "black",
          })}
          value={materialAveriado}
          text={`${materialAveriado} % `}
        />
      </div>
      <div className="graficas">
        <h1>Operativo</h1>

        <CircularProgressbar
          styles={buildStyles({
            pathColor:
              materialOperativo > 60
                ? "#DC2626"
                : materialOperativo < 60 && materialOperativo > 40
                ? "#d8f007"
                : "#35DE0B",
            trailColor: "#F5C5F1",
            //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
            textColor: "black",
          })}
          value={materialOperativo}
          text={`${materialOperativo} % `}
        />
      </div>
    </div>
  );
};

export default index;
