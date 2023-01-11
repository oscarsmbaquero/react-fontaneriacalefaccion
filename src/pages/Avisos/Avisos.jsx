import React, { useContext } from 'react';
import { SWContext } from "../../context/context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//components
import AddAvisos from "./Components/AddAvisos/AddAvisos";
import AvisosAbiertos from "./Components/AvisosAbiertos/AvisosAbiertos";
import AvisosPendientes from "./Components/AvisosPendientes/AvisosPendientes"
//import MostrarIntervenciones from "./Components/MostrarIntervenciones"

const Avisos = () => {
  const { averias } = useContext(SWContext);
  const [value, setValue] = React.useState(1);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const averiasAbiertas = averias.filter((avisos)=>avisos.estado ==='Abierto') ;
  const numeroAveriasAbiertas = averiasAbiertas.length;

  const averiasPendientes = averias.filter((avisos)=>avisos.estado ==='Pendiente') ;
  const numeroAveriasPendientes = averiasPendientes.length;




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
     </Box>  
  </>
  )
}

export default Avisos