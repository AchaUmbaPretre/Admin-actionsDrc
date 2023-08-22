import './sidebar.scss'
import {Link} from 'react-router-dom'
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

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Accueil');
  return (
    <>
        <div className="sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar-imgs">
              <img src={actions} alt="" className='sidenav-img' />
            </div>
            <ul className="sidebar-ul">
              <li className={`sidenav-li ${activeItem === 'Accueil' ? 'active' : ''}`}><HomeIcon className='sidebar-icon'/><Link to="/" onClick={() => setActiveItem('Accueil')}>Accueil</Link></li>
              <li className={`sidenav-li ${activeItem === 'Personnel' ? 'active' : ''}`}><PersonOutlineIcon className='sidebar-icon'/><Link to={"/personnel"} onClick={() => setActiveItem('Personnel')}>Personnel</Link></li>
              <li className={`sidenav-li ${activeItem === 'Contrats' ? 'active' : ''}`}><FlakyIcon className='sidebar-icon'/><Link to={"/contrats"} onClick={() => setActiveItem('Contrats')}>Contrats</Link></li>
              <li className={`sidenav-li ${activeItem === 'Affectation' ? 'active' : ''}`}><ShowChartIcon className='sidebar-icon'/><Link to={"/affectation"} onClick={() => setActiveItem('Affectation')}>Affectation</Link></li>
              <li className={`sidenav-li ${activeItem === 'Mission' ? 'active' : ''}`}><AssignmentIndIcon className='sidebar-icon'/><Link to={"/mission"} onClick={() => setActiveItem('Mission')}>Mission</Link></li>
              <li className={`sidenav-li ${activeItem === 'Client' ? 'active' : ''}`}><GroupsIcon className='sidebar-icon'/><Link to={"/client"} onClick={() => setActiveItem('Client')}>Client</Link></li>
              <li className={`sidenav-li ${activeItem === 'Horaires de travail' ? 'active' : ''}`}><AccessTimeIcon className='sidebar-icon'/><Link to={"/horaireAll"} onClick={() => setActiveItem('Horaires de travail')}>Horaires de travail</Link></li>
              <li className={`sidenav-li ${activeItem === 'Presence' ? 'active' : ''}`}><ChecklistRtlIcon className='sidebar-icon'/><Link to={"/presence"} onClick={() => setActiveItem('Presence')}>Presence</Link></li>
              <li className={`sidenav-li ${activeItem === 'Facturation' ? 'active' : ''}`}><FactCheckIcon className='sidebar-icon'/><Link to={"/facturation"} onClick={() => setActiveItem('Facturation')}>Facturation</Link></li>
              <li className={`sidenav-li ${activeItem === 'Payement' ? 'active' : ''}`}><AttachMoneyIcon className='sidebar-icon'/><Link to={"/payement"} onClick={() => setActiveItem('Payement')}>Payement</Link></li>
{/*               <li className="sidenav-li"><FormatListNumberedIcon className='sidebar-icon'/><Link to={"/listeConge"}>Liste de congé</Link></li> */}
            </ul>
          </div>
        </div>
    </>
  )
}

export default Sidebar