import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from '../../../config';

const FormConge = ({handleClose}) => {
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
      let errorMessage = 'Une erreur s\'est produite lors de la communication avec le serveur';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });

      console.log(errorMessage);
    }
  };

  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Formulaire de demande de congé</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Employé(e) <span>*</span></label>
                <Select
                  options={selected.map(item => ({ value: item.id, label: item.first_name }))}
                  onChange={(selectedOption) => setEmployeeId(selectedOption.value)}
                  placeholder="Sélectionnez l'employé(e)"
                  isSearchable
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de début<span>*</span></label>
                <input type="date" name='date' className="input-form" required onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de fin<span>*</span></label>
                <input type="date" name='date' className="input-form" required onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Type de congé <span>*</span></label>
                <Select
                  options={selected.map(item => ({ value: item.id, label: item.first_name }))}
                  onChange={(selectedOption) => setEmployeeId(selectedOption.value)}
                  placeholder="Sélectionnez l'employé(e)"
                  isSearchable
                  required
                />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Statut de la demande<span>*</span></label>
                <select name="" id="" className="input-form">
                    <option disabled >Selectionnez un statut....</option>
                    <option value="approuvée">Approuvée</option>
                    <option value="refusé">Refusé</option>
                </select>
              </div>
            </div>

            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormConge;