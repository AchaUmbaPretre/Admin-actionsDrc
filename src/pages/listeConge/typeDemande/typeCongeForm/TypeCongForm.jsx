import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from '../../../../config';

const TypeCongForm = ({handleClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [employeeId, setEmployeeId] = useState('');
  const [clientEtat, setClientEtat] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [date, setDate] = useState(null);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin`);
        setSelected(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/admin/client`);
        setClientEtat(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    handleClose()
    try {
      await axios.post(`${DOMAIN}/api/admin/presences`, {
        employee_id: employeeId,
        client_id: clientId,
        date: date,
        check_in_time: { day: 7, time: checkInTime },
        check_out_time: { day: 7, time: checkOutTime },
      });

      Swal.fire({
        title: 'Success',
        text: 'La présence a été enregistrée avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/presence');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Type de presences</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Nom de type<span>*</span></label>
                <input type="text" className="input-form" required placeholder='Ecrire....' />
              </div>

              <div className="form-row">
                <label htmlFor="" className="label-form">Nombre de jour<span>*</span></label>
                <input type="number" className="input-form" required onChange={(e) => setCheckOutTime(e.target.value)} />
              </div>
            </div>

            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TypeCongForm;