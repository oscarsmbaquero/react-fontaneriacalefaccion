import Home from '../pages/Home/Home';
import Avisos from '../pages/Avisos/Avisos';
import Material from '../pages/Material/Material';
import IntercencionAviso from '../pages/Avisos/Components/IntervencionAviso/IntercencionAviso';
import DetailAvisos from '../pages/Avisos/Components/DetailAvisos/DetailAvisos';
import Clientes from '../pages/Clientes/Clientes';
import SignIn from '../pages/User/Login/SignIn';
import SignUp from '../pages/User/Register/SignUp';
import MostrarIntervencion  from '../pages/Avisos/Components/MostrarIntervenciones/MostrarIntervencion';
import AddMaterial from '../pages/Material/Components/AltaMaterial/AddMaterial';
import AddAvisos from '../pages/Avisos/Components/AddAvisos/AddAvisos';
import AddCliente from '../pages/Clientes/Components/AddCliente/AddCliente';
import ShowHistory from '../pages/Clientes/Components/ShowHistory/ShowHistory';




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
  {
    path: "/addMaterial",
    element: <AddMaterial/>,
  },
  {
    path: "/addAvisos",
    element: <AddAvisos/>,
  },
  {
    path: "/addIntervencion/:id/:cliente",
    element: <IntercencionAviso/>,
  },
  {
    path: "/avisos/details/:id",
    element: <DetailAvisos />,
  },
  {
    path: "/avisos/mostrar/intervencion/:id",
    element: <MostrarIntervencion />,
  },
  {
    path: "/addCliente",
    element: <AddCliente/>,
  },
  {
    path: "/getClientHistory/:id",
    element: <ShowHistory/>,
  },

];

export default routes;