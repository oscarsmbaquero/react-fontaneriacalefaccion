import Home from '../pages/Home/Home';
import Avisos from '../pages/Avisos/Avisos';
import Material from '../pages/Material/Material';
import Datos from '../pages/Datos/Datos';



const routes = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/avisos",
    element: <Avisos/>,
  },
  {
    path: "/material",
    element: <Material/>,
  },
  {
    path: "/datos",
    element: <Datos/>,
  },
];

export default routes;