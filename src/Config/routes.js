import Home from '../pages/Home/Home';
import Avisos from '../pages/Avisos/Avisos';
import Material from '../pages/Material/Material';
import Datos from '../pages/Datos/Datos';
import MyDocument from '../pages/Calendar/MyDocument';
import IntercencionAviso from '../pages/Avisos/Components/IntervencionAviso/IntercencionAviso';
import DetailAvisos from '../pages/Avisos/Components/DetailAvisos/DetailAvisos';
import Clientes from '../pages/Clientes/Clientes'



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
    path: "/clientes",
    element: <Clientes/>,
  },
  {
    path: "/calendar",
    element: <MyDocument/>,
  },
  {
    path: "/addIntervencion/:id",
    element: <IntercencionAviso/>,
  },
  {
    path: "/avisos/details/:id",
    element: <DetailAvisos />,
  },
];

export default routes;