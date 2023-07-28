import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css'
import Rightbar from './pages/rightbar/Rightbar';
import Personnel from './pages/personnel/Personnel';
import Contrats from './pages/contrats/Contrats';
import Presence from './pages/presence/Presence';
import Facturation from './pages/faturation/Facturation';
import ListeConge from './pages/listeConge/ListeConge';
import Affectation from './pages/affectation/Affectation';
import Views from './pages/views/Views';
import Edit from './pages/personnel/edit/Edit';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {

  const Layout = () =>{
    return(
      <div>
        <Topbar/>
        <div className="appContainer">
          <Sidebar/>
          <div className="appOutlet">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Rightbar/>
        },
        {
          path: '/personnel',
          element: <Personnel/>
        },
        {
          path: '/views/:id',
          element: <Views/>
        },
        {
          path: '/edit/:id',
          element: <Edit/>
        },
        {
          path: '/contrats',
          element: <Contrats/>
        },
        {
          path: '/affectation',
          element: <Affectation/>
        },
        {
          path: '/presence',
          element: <Presence/>
        },
        {
          path: '/facturation',
          element: <Facturation/>
        },
        {
          path: '/listeConge',
          element: <ListeConge/>
        }
    ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
  ])

  return (
 
      <div>
        <RouterProvider router={router} />
      </div>

  );
}

export default App;