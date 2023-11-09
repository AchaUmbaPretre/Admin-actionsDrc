import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { AuthContext } from '../../context/authContext';
import './topbar.scss';
import admin from '../../assets/user.png';
import { Menu } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Topbar = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { Logout } = React.useContext(AuthContext);

  const handleMenu = async () => {
    try {
      await Logout();

      toast.success("L'application a été déconnectée avec succès", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      navigate('/');

    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });

      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <Menu className='topbar-img-title' />
        </div>
        <div className="topbar-right">
          <MailOutlineIcon className='topbar-icon' />
          <NotificationsNoneIcon className='topbar-icon' />
          <img src={admin} alt="" className="topbar-img" />
          <div className="topbar-row" onClick={handleMenu}>
            <PowerSettingsNewIcon className='topbar-power' />
            <span className="span-logout">Déconnecter</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Topbar;