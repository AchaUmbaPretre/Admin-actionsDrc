import './sidebar.scss'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const Sidebar = () => {
  return (
    <>
        <div className="sidebar">
          <div className="sidebar-wrapper">
            <ul className="sidebar-ul">
              <li className="sidenav-li"><HomeIcon className='sidebar-icon'/><Link>Accueil</Link></li>
              <li className="sidenav-li"><PersonOutlineIcon className='sidebar-icon'/><Link>Personnel</Link></li>
              <li className="sidenav-li"><ShowChartIcon className='sidebar-icon'/><Link>Affectation</Link></li>
              <li className="sidenav-li"><ChecklistRtlIcon className='sidebar-icon'/><Link>Presence</Link></li>
              <li className="sidenav-li"><FactCheckIcon className='sidebar-icon'/><Link>Facturation</Link></li>
              <li className="sidenav-li"><FormatListNumberedIcon className='sidebar-icon'/><Link>Liste de congé</Link></li>
            </ul>
          </div>
        </div>

    </>
  )
}

export default Sidebar