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
import MissiAff from './pages/mission/missionAff/MissiAff';
import MissionContrat from './pages/mission/missionContrat/MissionContrat';
import PersonTablePdf from './pages/personnel/personPdf/PersonTablePdf';
import ContratPdf from './pages/contrats/contratPdf/ContratPdf';
import MissionPdf from './pages/mission/missionPdf/MissionPdf';
import ClientPdf from './pages/clientTab/clientPdf/ClientPdf';
import PresencePdf from './pages/presence/presencePdf/PresencePdf';
import FaturationPdf from './pages/faturation/FaturationPdf';
import Horaire from './pages/horaire/Horaire';
import AffView from './pages/affectation/affView.jsx/AffView';
import FormAdd from './pages/contrats/addContrat/formAdd/FormAdd';
import Fonctions from './pages/fonctions/Fonctions';
import AffView2 from './pages/affectation/affView.jsx/AffView2';
import Page404 from './pages/page404/Page404';
import ContratFonctionEdit from './pages/fonctions/fonctionEdit/ContratFonctEdit';
import FonctionView from './pages/fonctions/fonctionView/FonctionView';
import PaiementView from './pages/payement/paiementView/PaiementView';
import PaiementEdit from './pages/payement/paiementEdit/PaiementEdit';
import PaiementPdf from './pages/payement/PaiementPdf';
import Views from './pages/personnel/views/Views';
import AffEdite from './pages/affectation/edite/AffEdite';
import Sites from './pages/sites/Sites';
import FactureContrat from './pages/faturation/factureAgent/FactureContrat';
import FactureCalcul from './pages/faturation/factureCalcule/FactureCalcul';
import PresenceAgent from './pages/presence/presenceAgent/PresenceAgent';
import PresenceList from './pages/presence/presenceListe/PresenceList';
import SitesEdit from './pages/sites/sitesEdite/SitesEdit';
import SitesViews from './pages/sites/sitesViews/SitesViews';
import PaiementAgent from './pages/payement/paiementAgent/PaiementAgent';
import PaiementContrat from './pages/payement/paiementContrat/PaiementContrat';
import PresentEdit from './pages/presence/presenceEdit/PresentEdit';
import PresenceListView from './pages/presence/presenceListView/PresenceListView';
import AffectationPdf from './pages/affectation/affectationPdf/AffectationPdf';
import AffEdite2 from './pages/affectation/edite/AffEdite2';
import RapportPresence from './pages/rapportPresence/RapportPresence';
import Departement from './pages/departement/Departement';
import DepartementEdit from './pages/departement/formEdite/DepartementEdit';
import Formulaire2 from './pages/personnel/formulaire2/Formulaire2';
import TypeConge from './pages/listeConge/typeDemande/TypeConge';
import EditConge from './pages/listeConge/typeDemande/editConge/EditConge';
import ListeCongeEdit from './pages/listeConge/listeCongeEdit/ListeCongeEdit';
import Corbeille from './pages/personnel/corbeille/Corbeille';
import CorbeilleContrat from './pages/contrats/corbeilleContrat/CorbeilleContrat';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
          path: '/formulaire2',
          element: <Formulaire2 />
        },
        {
          path: '/corbeille-employe',
          element: <Corbeille />
        },
        {
          path: '/departement',
          element: <Departement />
        },
        {
          path: '/departementEdite/:id',
          element: <DepartementEdit />
        },
        {
          path: '/contrats',
          element: <Contrats />
        },
        {
          path: '/contrats-corbeille',
          element: <CorbeilleContrat />
        },
        {
          path: '/contratsView/:id',
          element: <ContratView />
        },
        {
          path: '/formAdd',
          element: <FormAdd />
        },
        {
          path: '/contratFonctionEdit/:id',
          element: <ContratFonctionEdit/>
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
          path: '/sites',
          element: <Sites />
        },
        {
          path: '/sitesEdit/:id',
          element: <SitesEdit/>
        },
        {
          path: '/sitesView/:id',
          element: <SitesViews/>
        },
        {
          path: '/affectation',
          element: <Affectation />
        },
        {
          path: '/affectations/:id',
          element: <AffView />
        },
        {
          path: '/affectationView/:id',
          element: <AffView2 />
        },
        {
          path: '/affectationEdit/:id',
          element: <AffEdite />
        },
        {
          path: '/affectationEdit2/:id',
          element: <AffEdite2 />
        },
        {
          path: '/affectationPdf',
          element: <AffectationPdf />
        },
        {
          path: '/fonction',
          element: <Fonctions />
        },
        {
          path: '/fonctionView/:id',
          element: <FonctionView />
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
          path: "/presenceView/:id",
          element: <PresenceView />
        },
        {
          path: "/presenceListView/:id",
          element: <PresenceListView />
        },
        {
          path: '/presenceEdit/:id',
          element: <PresentEdit />
        },
        {
          path: '/presenceAgent',
          element: <PresenceAgent />
        },
        {
          path: '/presenceList',
          element: <PresenceList />
        },
        {
          path: '/rapportPresence',
          element: <RapportPresence />
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
          path: '/factureContrat',
          element: <FactureContrat />
        },
        {
          path: '/factureCalcul',
          element: <FactureCalcul />
        },
        {
          path: '/listeConge',
          element: <ListeConge />
        },
        {
          path: '/listeCongeEdit/:id',
          element: <ListeCongeEdit />
        },
        {
          path: '/typeCongé',
          element: <TypeConge />
        },
        {
          path: '/editConge/:id',
          element: <EditConge />
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
          path: '/paiement',
          element: <Payement />
        },
        {
          path: '/payementView/:id',
          element: <PaiementView />
        },
        {
          path: '/payementEdit/:id',
          element: <PaiementEdit />
        },
        {
          path: '/paiementContrat',
          element: <PaiementContrat />
        },
        {
          path: '/paiementAgent',
          element: <PaiementAgent />
        },
        {
          path: '/payementPdf',
          element: <PaiementPdf />
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
    },
    {
      path: '/*',
      element: <Page404 />
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