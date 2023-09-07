import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './../../../../config';

const FormAdd = ({handleClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [clientEtat, setClientEtat] = useState([]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [date, setDate] = useState(null);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();



  const handleClick = async (e) => {
    e.preventDefault();
    handleClose()
   
  };

  return (
    <>
      <div className="clientForm">
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Competence<span>*</span></label>
                <input type="text" name='skills' className="input-form" required onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Avantages<span>*</span></label>
                <input type="text" name='avantages' className="input-form" required onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Prix<span>*</span></label>
                <input type="number" name='prix' className="input-form" required onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Salaire<span>*</span></label>
                <input type="number" name='salaire' className="input-form" required onChange={(e) => setCheckInTime(e.target.value)} />
              </div>
            </div>
            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormAdd;