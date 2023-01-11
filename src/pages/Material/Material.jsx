import React, { useContext } from 'react';
import { SWContext } from "../../context/context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//components
import AddMaterial from './Components/AltaMaterial/AddMaterial';
import Vehiculo from './Components/Vehiculo/Vehiculo';
import Almacen from './Components/Almacen/Almacen';
import Graficas from './Components/Graficas/Index';
import Averiado from './Components/Averiado/Averiado';

const Material = () => {
  const { material } = useContext(SWContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //filtros material
  const materialFurgo = material.filter(
    (mat) => mat.ubicacion === "Furgo" && mat.estado ==='Operativo'
  );
  const UnidadesMaterialFurgo = materialFurgo.length;


  const materialAlmacen = material.filter(
    (mat) => mat.ubicacion === "Almacen" && mat.estado ==='Operativo'
  );
  const UnidadesMaterialAlmacen = materialAlmacen.length;

  const materialAveriado = material.filter(
    (mat) => mat.estado === "Averiado"
  );
  const UnidadesMaterialAveriado = materialAveriado.length;
  
  
  
  //end filtros material
  
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
          <Tab label="Añadir Material" />
          <Tab label={`Vehículo-${UnidadesMaterialFurgo}-`} />
          <Tab label={`Almacén-${UnidadesMaterialAlmacen}-`}/>
          <Tab label={`Averiado-${UnidadesMaterialAveriado}-`}/>
          <Tab label="Graficas"/>
        </Tabs>
      </Box>
      <Box sx={{ padding: 1 }}>
      {value === 0 && (
          <Box>
           <AddMaterial/> 
          </Box>
        )}
        {value === 1 && (
          <Box>
            <Vehiculo material={materialFurgo}/>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <Almacen material={materialAlmacen}
            />
          </Box>
          )}
          {value === 3 && (
          <Box>
            <Averiado material={materialAveriado}
            />
          </Box>
          )}
          {value === 4 && (
          <Box>
            <Graficas materialAveriado={UnidadesMaterialFurgo} materialOperativo={UnidadesMaterialAlmacen}
            />
          </Box>
          )}
       </Box>  
    </>
  )
}

export default Material