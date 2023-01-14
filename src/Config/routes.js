import Home from '../pages/Home/Home';
import Avisos from '../pages/Avisos/Avisos';
import Material from '../pages/Material/Material';
import IntercencionAviso from '../pages/Avisos/Components/IntervencionAviso/IntercencionAviso';
import DetailAvisos from '../pages/Avisos/Components/DetailAvisos/DetailAvisos';
import Clientes from '../pages/Clientes/Clientes';
import SignIn from '../pages/User/Login/SignIn';
import SignUp from '../pages/User/Register/SignUp';
import MostrarIntervencion  from '../pages/Avisos/Components/MostrarIntervenciones/MostrarIntervencion'



const routes = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "user/login",
    element: <SignIn />,
  },
  {
    path: "/users/register",
    element: <SignUp />,
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
  // {
  //   path: "/calendar",
  //   element: <MyDocument/>,
  // },
  {
    path: "/addIntervencion/:id",
    element: <IntercencionAviso/>,
  },
  {
    path: "/avisos/details/:id",
    element: <DetailAvisos />,
  },
  {
    path: "/avisos/mostartIntervencion/:id",
    element: <MostrarIntervencion />,
  },

];

export default routes;