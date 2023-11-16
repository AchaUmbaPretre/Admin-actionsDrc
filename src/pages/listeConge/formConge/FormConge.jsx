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
  const [loading, setLoading] = useState(true);
  const [leave, setLeave] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState({});
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState([]);
  const options = [
    { value: 'approuvée', label: 'Approuvée' },
    { value: 'refusé', label: 'Refusé' }
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev)=> ({...prev, [e.target.name]:e.target.value}))
  }


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
        const res = await axios.get(`${DOMAIN}/api/leave/typeConge`);
        setType(res.data);
        setLoading(false)
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
      await axios.post(`${DOMAIN}/api/leave/demandeConge`, { ...data,
        employee_id: employeeId,
        leave_type: leave,
        status : status
      });

      Swal.fire({
        title: 'Success',
        text: 'Le congé a été enregistré avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/listeConge');
      window.location.reload();
    } catch (error) {

      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(error);
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
                <label htmlFor="" className="label-form">Type de congé <span>*</span></label>
                <Select
                  options={type.map(item => ({ value: item.id, label: item.nom_type }))}
                  onChange={(selectedOption) => setLeave(selectedOption.value)}
                  placeholder="Sélectionnez un type de congé"
                  isSearchable
                  required
                />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de début<span>*</span></label>
                <input type="date" name='start_date' className="input-form" required onChange={handleChange} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de fin<span>*</span></label>
                <input type="date" name='end_date' className="input-form" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Statut de la demande<span>*</span></label>
                <Select
                  name="status"
                  id="status"
                  options={options}
                  onChange={(selectedOption) => setStatus(selectedOption.value)}
                  placeholder="Sélectionnez un statut..."
                />
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