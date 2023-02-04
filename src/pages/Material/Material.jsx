import React, { useEffect, useState } from 'react';
//import { SWContext } from "../../context/context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BASE_URL } from "../../assets/ApiRoutes";
import axios from "axios";

//components
import AddMaterial from './Components/AltaMaterial/AddMaterial';
import Vehiculo from './Components/Vehiculo/Vehiculo';
import Almacen from './Components/Almacen/Almacen';
import Averiado from './Components/Averiado/Averiado';

const Material = () => {
  //const { material ,setMaterial} = useMaterial();
  //const { material } = useContext(SWContext);
  const [value, setValue] = React.useState(1);
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await axios.get(`${BASE_URL}/material`);
      setMaterial(res.data);
    };
    fetchMaterial();
  },[]);
  
  //funcion para cambiar Tab
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
        >
          <Tab label="Añadir Material" />
          <Tab label={`Vehículo-${UnidadesMaterialFurgo}-`} />
          <Tab label={`Almacén-${UnidadesMaterialAlmacen}-`}/>
          <Tab label={`Averiado-${UnidadesMaterialAveriado}-`}/>
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
            <Vehiculo material={materialFurgo} setMaterial={setMaterial}/>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <Almacen material={materialAlmacen} setMaterial={setMaterial}/>
          </Box>
          )}
          {value === 3 && (
          <Box>
            <Averiado material={materialAveriado} setMaterial={setMaterial}/>
          </Box>
          )}
       </Box>  
    </>
  )
}

export default Material