import React, { useEffect, useState } from "react";
import "./Home.scss";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useGetAuth } from "../../context/context";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import fondo from "../../../src/assets/images/flyer.jpg";

import { BASE_URL } from "../../assets/ApiRoutes";

const resultadoOperativo = 80;
const resultadoAveriado = 20;

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Home() {
  const userLogged = useGetAuth();
  let [avisos, SetAvisos] = useState([]);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/avisos`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, []);

  // Estadisticas Cáceres
  // const averiasCaceres = avisos.filter(
  //   (aviso) => aviso.provincia === "Cáceres"
  // );
  // const intervencionesCaceres = averiasCaceres.filter(
  //   (aviso) => aviso.intervencion.length
  // );
  // const totalIntervencionesCaceres = intervencionesCaceres.reduce(
  //   (acumulador, operativo) => acumulador + operativo.intervencion.length,
  //   0
  // );
  // const promedioCaceres = (totalIntervencionesCaceres / avisos.length).toFixed(
  //   1
  // );
  // const totalCaceres = (averiasCaceres.length);

  // const intervencionesCaceresPendientes = avisos.filter(
  //   (aviso) => aviso.provincia === "Cáceres" && aviso.estado === "Pendiente"
  // );
  // const totalPendienteCaceres = intervencionesCaceresPendientes.length;

  // // Estadisticas Badajoz
  // const averiasBadajoz = avisos.filter(
  //   (aviso) => aviso.provincia === "Badajoz"
  // );
  // const intervencionesBadajoz = averiasBadajoz.filter(
  //   (aviso) => aviso.intervencion.length
  // );
  // const totalIntervencionesBadajoz = intervencionesBadajoz.reduce(
  //   (acumulador, operativo) => acumulador + operativo.intervencion.length,
  //   0
  // );
  // const promedioBadajoz = (totalIntervencionesBadajoz / avisos.length).toFixed(
  //   1
  // );
  // const totalBadajoz = (averiasBadajoz.length);

  // const intervencionesBadajozPendientes = avisos.filter(
  //   (aviso) => aviso.provincia === "Badajoz" && aviso.estado === "Pendiente"
  // );
  // const totalPendienteBadajoz = intervencionesBadajozPendientes.length;

  return (
    <div className="estadisticas">
      {userLogged.id ? (
        <>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography
                sx={{ color: "text.secondary", alignContent: "center" }}
              >
                Graficos Avisos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="graficas_home">
                <div className="grafica_home">
                  <h6>Interv. / Aviso</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoOperativo >= 3
                          ? "#DC2626"
                          : resultadoOperativo < 3 && resultadoOperativo > 2
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoOperativo}
                    text={`${resultadoOperativo} % `}
                  />
                </div>
                <div className="grafica_home">
                  <h6>T. Avisos</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoOperativo > 60
                          ? "#DC2626"
                          : resultadoOperativo < 60 && resultadoOperativo > 40
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoOperativo}
                    text={`${resultadoOperativo}`}
                  />
                </div>
                <div className="grafica_home">
                  <h6>T. Pendientes</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoOperativo > 10
                          ? "#DC2626"
                          : resultadoOperativo < 60 &&
                          resultadoOperativo > 40
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoOperativo}
                    text={`${resultadoOperativo}`}
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel3d-header"
            >
              <Typography
                sx={{ color: "text.secondary", alignContent: "center" }}
              >
                Graficos Avisos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="graficas_home">
                <div className="grafica_home">
                  <h6>Interv. / Aviso</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoAveriado >= 3
                          ? "#DC2626"
                          : resultadoAveriado < 3 && resultadoAveriado > 2
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoAveriado}
                    text={`${resultadoAveriado} % `}
                  />
                </div>
                <div className="grafica_home">
                  <h6>T. Avisos</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoAveriado > 60
                          ? "#DC2626"
                          : resultadoAveriado < 60 && resultadoAveriado > 40
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoAveriado}
                    text={`${resultadoAveriado}`}
                  />
                </div>
                <div className="grafica_home">
                  <h6>T. Pendientes</h6>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor:
                      resultadoAveriado > 10
                          ? "#DC2626"
                          : resultadoAveriado < 60 &&
                          resultadoAveriado > 40
                          ? "#d8f007"
                          : "#35DE0B",
                      trailColor: "#F5F5F5",
                      //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                      textColor: "black",
                    })}
                    value={resultadoAveriado}
                    text={`${resultadoAveriado}`}
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <div className="home">
          <img src={fondo} alt="Fondo" className="image"></img>
        </div>
      )}
    </div>
  );
}
