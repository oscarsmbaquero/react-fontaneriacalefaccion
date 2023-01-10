import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../assets/ApiRoutes";

//Creamos el creador de contexto:
export const SWContext = createContext();

//Vamos a definir el proveedor de mi contexto:
export const SWContextProvider = ({ children }) => {
  const [averias, setAverias] = useState([]);
  const [material, setMaterial] = useState([]);

  console.log(material,'metrial')
  console.log(averias,'averias')
  useEffect(() => {
    const fetchGalery = async () => {
      const res = await axios.get(`${BASE_URL}/avisos`);
      setAverias(res.data);
    };
    fetchGalery();
  }, []);

  
  useEffect(() => {
    const fetchPlatos = async () => {
      const res = await axios.get(`${BASE_URL}/material`);
      setMaterial(res.data);
    };
    fetchPlatos();
  }, []);


  return (
    <SWContext.Provider value={{ averias, material }}>
      {children}
    </SWContext.Provider>
  );
};
