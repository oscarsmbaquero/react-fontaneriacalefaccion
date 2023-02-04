import React, { useEffect, useState } from 'react';
//import { SWContext } from "../../context/context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BASE_URL } from "../../assets/ApiRoutes";
import axios from "axios";

//components
import AddCliente from './Components/AddCliente/AddCliente';
import ShowClientes from './Components/ShowClientes/ShowClientes';
const Clientes = () => {
  //const { material ,setMaterial} = useMaterial();
  //const { material } = useContext(SWContext);
  const [value, setValue] = React.useState(1);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(`${BASE_URL}/clientes`);
      setClientes(res.data);
    };
    fetchClientes();
  },[]);
  
  //funcion para cambiar Tab
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
        >
          <Tab label="Añadir Cliente" />
          <Tab label="Mostrar Clientes" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 1 }}>
      {value === 0 && (
          <Box>
           <AddCliente/> 
          </Box>
        )}
        {value === 1 && (
          <Box>
            <ShowClientes clientes={clientes}/>
          </Box>
        )}
       </Box>  
    </>
  )
}

export default Clientes