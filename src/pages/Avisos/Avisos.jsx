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
  const [value, setValue] = React.useState(0);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
        <Tab label="Añadir Aviso"/>
        <Tab label="Avisos Abiertos"/>
        <Tab label="Avisos Pendientes"/>
        
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
          <AvisosAbiertos averias={averias}/>
        </Box>
        )}
        {value === 2 && (
        <Box>
          <AvisosPendientes/>
        </Box>
        )}
     </Box>  
  </>
  )
}

export default Avisos