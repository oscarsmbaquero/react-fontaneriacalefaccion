import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
//import { SWContext } from "../../context/context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BASE_URL } from "../../assets/ApiRoutes";
//components
import AddAvisos from "./Components/AddAvisos/AddAvisos";
import AvisosAbiertos from "./Components/AvisosAbiertos/AvisosAbiertos";
import AvisosPendientes from "./Components/AvisosPendientes/AvisosPendientes"
import AvisosCerrados from "./Components/AvisosCerrados/AvisosCerrados"
//import MostrarIntervenciones from "./Components/MostrarIntervenciones"

const Avisos = () => {
  //const { averias } = useContext(SWContext);
  const [value, setValue] = React.useState(1);
  const [averias, setAverias] = useState([]);

  // const totalHoras = averias.totalHoras.reduce(
  //   (acumulador, operativo) => acumulador + operativo.intervencion.length,
  //   0
  // );
  // console.log(totalHoras,'totalHoras')

  useEffect(() => {
    const fetchAvisos = async () => {
      const res = await axios.get(`${BASE_URL}/avisos`);
      setAverias(res.data);
    };
    fetchAvisos();
  }, [averias]);
  
 //console.log(averias,'averias')


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const averiasAbiertas = averias.filter((avisos)=>avisos.estado ==='Abierto') ;
  const numeroAveriasAbiertas = averiasAbiertas.length;

  const averiasPendientes = averias.filter((avisos)=>avisos.estado ==='Pendiente') ;
  const numeroAveriasPendientes = averiasPendientes.length;

  const averiasCerradas = averias.filter((avisos)=>avisos.estado ==='Cerrada') ;
  const numeroAveriasCerradas = averiasCerradas.length;




  return (
    <>
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        indicatorColor="primary"
        textColor="primary"
        visibleScrollbar="true"
      >
        <Tab label="Añadir Avisos"/>
        <Tab label={`Averias Abiertas-${numeroAveriasAbiertas}`}/>
        <Tab label={`Averias Pendientes-${numeroAveriasPendientes}`}/>
        <Tab label={`Averias Cerradas-${numeroAveriasCerradas}`}/>
        
      </Tabs>
    </Box>
    <Box sx={{ padding: 1 }}>
      {value === 0 && (
        <Box>
          <AddAvisos />
        </Box>
      )}
      {value === 1 && (
        <Box>
          <AvisosAbiertos averias={averiasAbiertas}/>
        </Box>
        )}
        {value === 2 && (
        <Box>
          <AvisosPendientes averias={averiasPendientes}/>
        </Box>
        )}
        {value === 3 && (
        <Box>
          <AvisosCerrados averias={averiasCerradas}/>
        </Box>
        )}
     </Box>  
  </>
  )
}

export default Avisos