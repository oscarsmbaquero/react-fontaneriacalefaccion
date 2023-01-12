// import axios from "axios";
// import { createContext, useState, useEffect } from "react";
// import { BASE_URL } from "../assets/ApiRoutes";

// //Creamos el creador de contexto:
// export const SWContext = createContext();

// //Vamos a definir el proveedor de mi contexto:
// export const SWContextProvider = ({ children }) => {
//   const [averias, setAverias] = useState([]);
//   const [material, setMaterial] = useState([]);

//   console.log(material,'material')
//   console.log(averias,'averias')

  
//   useEffect(() => {
//     const fetchAvisos = async () => {
//       const res = await axios.get(`${BASE_URL}/avisos`);
//       setAverias(res.data);
//     };
//     fetchAvisos();
//   }, []);

  
//   useEffect(() => {
//     const fetchMaterial = async () => {
//       const res = await axios.get(`${BASE_URL}/material`);
//       setMaterial(res.data);
//     };
//     fetchMaterial();
//   }, []);


//   return (
//     <SWContext.Provider value={{ averias, material }}>
//       {children}
//     </SWContext.Provider>
//   );
// };
