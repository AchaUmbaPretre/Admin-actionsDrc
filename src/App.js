import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
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
import ClientTab from './pages/clientTab/ClientTab';
import ClientForm from './pages/clientTab/form/ClientForm';
import AddContrat from './pages/contrats/addContrat/AddContrat';
import ClientView from './pages/clientTab/clientView/ClientView';
import EditeClient from './pages/clientTab/editClient/EditeClient';
import Mission from './pages/mission/Mission';
import MissionForm from './pages/mission/form/MissionForm';
import Horaires from './pages/horaire/form/Horaires';
import HoraireAll from './pages/horaire/HoraireAll';
import Formulaire from './pages/personnel/formulaire/Formulaire';
import { FadeLoader } from 'react-spinners';
import MissionView from './pages/mission/views/MissionView';
import HoraireView from './pages/horaire/view/HoraireView';
import PresenceView from './pages/presence/view/PresenceView';
import FactureView from './pages/faturation/view/FactureView';
import MissionEdit from './pages/mission/edite/MissionEdit';
import FatureEdit from './pages/faturation/edit/FatureEdit';
import Payement from './pages/payement/Payement';
import ContratView from './pages/contrats/view/ContratView';
import { MissedVideoCallTwoTone } from '@mui/icons-material';
import MissiAff from './pages/mission/missionAff/MissiAff';
import MissionContrat from './pages/mission/missionContrat/MissionContrat';
import PersonPdf from './pages/personnel/personPdf/PersonPdf';
import PersonTablePdf from './pages/personnel/personPdf/PersonTablePdf';
import ContratPdf from './pages/contrats/contratPdf/ContratPdf';
import MissionPdf from './pages/mission/missionPdf/MissionPdf';
import ClientPdf from './pages/clientTab/clientPdf/ClientPdf';
import PresencePdf from './pages/presence/presencePdf/PresencePdf';
import FaturationPdf from './pages/faturation/FaturationPdf';
import Horaire from './pages/horaire/Horaire';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const Layout = () => {
    return (
      <div>
        <div className="appContainer">
          <Sidebar />
          <div className="appOutlet">
            <Topbar />
            <div className="appOutletRow">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecuriteRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SecuriteRoute><Layout /></SecuriteRoute>,
      children: [
        {
          path: '/',
          element: <Rightbar />
        },
        {
          path: '/personnel',
          element: <Personnel />
        },
        {
          path: '/views/:id',
          element: <Views />
        },
        {
          path: '/edit/:id',
          element: <Edit />
        },
        {
          path: '/personpdfTable',
          element: <PersonTablePdf />
        },
        {
          path: '/personpdf/:id',
          element: <PersonPdf />
        },
        {
          path: '/contrats',
          element: <Contrats />
        },
        {
          path: '/contratsView/:id',
          element: <ContratView />
        },
        {
          path: '/contratsPdf',
          element: <ContratPdf />
        },
        {
          path: '/client',
          element: <ClientTab />
        },
        {
          path: '/affectation',
          element: <Affectation />
        },
        {
          path: '/presence',
          element: <Presence />
        },
        {
          path: '/presencePdf',
          element: <PresencePdf />
        },
        {
          path: "/presenceView/:emp1_id/:rowId",
          element: <PresenceView />
        },
        {
          path: '/facturation',
          element: <Facturation />
        },
        {
          path: '/facturationPdf',
          element: <FaturationPdf />
        },
        {
          path: '/facturationView/:id',
          element: <FactureView />
        },
        {
          path: '/facturationPut/:id',
          element: <FatureEdit />
        },
        {
          path: '/listeConge',
          element: <ListeConge />
        },
        {
          path: '/editContrat/:id',
          element: <EditContrat />
        },
        {
          path: '/clientForm',
          element: <ClientForm />
        },
        {
          path: '/viewsClient/:id',
          element: <ClientView />
        },
        {
          path: '/clientPdf',
          element: <ClientPdf />
        },
        {
          path: '/clientUpdate/:id',
          element: <EditeClient />
        },
        {
          path: '/contrats/addContrat/:id',
          element: <AddContrat />
        },
        {
          path: '/mission',
          element: <Mission />
        },
        {
          path: '/missionContrat',
          element: <MissionContrat />
        },
        {
          path: '/missions',
          element: <MissiAff />
        },
        {
          path: '/missionsPdf',
          element: <MissionPdf />
        },
        {
          path: '/missionForm',
          element: <MissionForm />
        },
        {
          path: '/missionView/:id',
          element: <MissionView />
        },
        {
          path: '/missionEdite/:id',
          element: <MissionEdit />
        },
        {
          path: '/horaires',
          element: <Horaires />
        },
        {
          path: '/horaireAll',
          element: <HoraireAll />
        },
        {
          path: '/horairesView/:id',
          element: <HoraireView />
        },
        {
          path: '/formulaire',
          element: <Formulaire />
        },
        {
          path: '/payement',
          element: <Payement />
        },
        {
          path: '/horaire',
          element: <Horaire />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);

  return (
    <div>
      {loading ? (
      <div className="spinnerContainer">
        <FadeLoader color="rgba(54, 215, 183, 1)" loading={loading} height={15} radius={2} margin={2} />
      </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;