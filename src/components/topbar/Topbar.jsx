import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './topbar.scss'
import actions from './../../assets/actionssarl.PNG'
import admin from '../../assets/maxim_nguz.PNG'

const Topbar = () => {
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
            <img src={actions} alt="" className='topbar-img-title' />
        </div>
        <div className="topbar-right">
          <MailOutlineIcon className='topbar-icon'/>
          <NotificationsNoneIcon className='topbar-icon'/>
          <img src={admin} alt="" className="topbar-img" />
          <div className="topbar-row">
            <PowerSettingsNewIcon className='topbar-power'/>
            <span className="span-logout">Logout</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default Topbar