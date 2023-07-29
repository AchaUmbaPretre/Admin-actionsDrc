import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import React, { useContext} from 'react'
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
import { AuthContext } from './context/authContext';
import EditContrat from './pages/contrats/edit/EditContrat';

function App() {
  const {currentUser} = useContext(AuthContext)

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

  const SecuriteRoute = ({children}) =>{
    if(!currentUser){
      return(
        <Navigate to="/login" />
      )
    }
    return children;
}

  const router = createBrowserRouter([
    {
      path: '/',
      element: (<SecuriteRoute><Layout/></SecuriteRoute>),
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
        },
        {
          path: '/editContrat/:id',
          element: <EditContrat/>
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