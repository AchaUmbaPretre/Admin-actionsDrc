import './sidebar.scss'
import {Link, useLocation} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FlakyIcon from '@mui/icons-material/Flaky';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState } from 'react';
import actions from './../../assets/actionssarl.PNG'
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

const Sidebar = () => {
  const  location = useLocation();
  console.log(location.pathname);
  const [activeItem, setActiveItem] = useState('Accueil');
  return (
    <>
        <div className="sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar-imgs">
              <img src={actions} alt="" className='sidenav-img'/>
            </div>
            <ul className="sidebar-ul">
              <li className={`sidenav-li ${location.pathname === '/' ? 'active' : ''}`}><HomeIcon className='sidebar-icon'/><Link to="/">Accueil</Link></li>
              <li className={`sidenav-li ${location.pathname === '/personnel' ? 'active' : ''}`}><PersonOutlineIcon className='sidebar-icon'/><Link to={"/personnel"}>Personnel</Link></li>
              <li className={`sidenav-li ${location.pathname === '/contrats' ? 'active' : ''}`}><FlakyIcon className='sidebar-icon'/><Link to={"/contrats"} >Contrats</Link></li>
              <li className={`sidenav-li ${location.pathname === '/affectation' ? 'active' : ''}`}><ShowChartIcon className='sidebar-icon'/><Link to={"/affectation"}>Affectation</Link></li>
              <li className={`sidenav-li ${location.pathname  === '/mission' ? 'active' : ''}`}><AssignmentIndIcon className='sidebar-icon'/><Link to={"/mission"} >Horaires</Link></li>
              <li className={`sidenav-li ${location.pathname  === '/client' ? 'active' : ''}`}><GroupsIcon className='sidebar-icon'/><Link to={"/client"} >Client</Link></li>
              <li className={`sidenav-li ${location.pathname  === '/fonction' ? 'active' : ''}`}><FollowTheSignsOutlinedIcon className='sidebar-icon'/><Link to={"/fonction"}>Fonctions</Link></li>
{/*               <li className={`sidenav-li ${activeItem === 'Horaires de travail' ? 'active' : ''}`}><AccessTimeIcon className='sidebar-icon'/><Link to={"/horaireAll"} onClick={() => setActiveItem('Horaires de travail')}>Horaires de travail</Link></li> */}
              <li className={`sidenav-li ${location.pathname  === '/presence' ? 'active' : ''}`}><ChecklistRtlIcon className='sidebar-icon'/><Link to={"/presence"} >Presence</Link></li>
              <li className={`sidenav-li ${location.pathname  === '/facturation' ? 'active' : ''}`}><FactCheckOutlinedIcon className='sidebar-icon'/><Link to={"/facturation"}>Facturation</Link></li>
              <li className={`sidenav-li ${location.pathname  === '/payement' ? 'active' : ''}`}><AttachMoneyIcon className='sidebar-icon'/><Link to={"/payement"}>Paiement</Link></li>
{/*               <li className="sidenav-li"><FormatListNumberedIcon className='sidebar-icon'/><Link to={"/listeConge"}>Liste de congé</Link></li> */}
            </ul>
          </div>
        </div>
    </>
  )
}

export default Sidebar