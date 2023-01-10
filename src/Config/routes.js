import Home from '../pages/Home/Home';
import Avisos from '../pages/Avisos/Avisos';
import Material from '../pages/Material/Material';
import Datos from '../pages/Datos/Datos';
import Calendar from '../pages/Calendar/Calandar';



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
  {
    path: "/calendar",
    element: <Calendar/>,
  },
];

export default routes;