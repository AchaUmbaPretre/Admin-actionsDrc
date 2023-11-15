import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from '../../../config';
import { emphasize } from '@mui/material';
import moment from 'moment';

const ListeCongeEdit = ({handleClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(true);
  const [leave, setLeave] = useState('');
  const [statusData, setStatusData] = useState('');
  const [data, setData] = useState({});
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const options = [
    { value: 'approuvée', label: 'Approuvée' },
    { value: 'refusé', label: 'Refusé' }
  ];
  const { employee_id, leave_type, status,start_date, end_date } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev)=> ({...prev, [e.target.name]:e.target.value}))
  }

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/leave/demandeConge/${id}`);
            setData(res.data[0])
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);

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
  
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment modifier ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        handleClick2();
      }
    });
  };
  
  const handleClick2 = async (e) => {

      try {
        await axios.put(`${DOMAIN}/api/leave/demandeConge/${id}`, {...data,
            employee_id : employeeId,
            leave_type: leave,
            status: status
        });
        navigate("/listeConge");
        Swal.fire({
          title: 'Success',
          text: 'la demande de congé a été modifiée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (err) {
          Swal.fire({
              title: 'Error',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
        console.log(err);
      }
  }


  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Modifier le demande de congé</h2>
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
                  value={employee_id}
                />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de début<span>*</span></label>
                <input type="date" value={moment(start_date).format('YYYY-MM-DD') || ''} name='start_date' className="input-form" onChange={handleChange} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Date de fin<span>*</span></label>
                <input type="date" value={moment(end_date).format('YYYY-MM-DD') || ''} name='end_date' className="input-form" onChange={handleChange} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Type de congé <span>*</span></label>
                <Select
                  options={type.map(item => ({ value: item.id, label: item.nom_type }))}
                  onChange={(selectedOption) => setLeave(selectedOption.value)}
                  placeholder="Sélectionnez un type de congé"
                  isSearchable
                  required
                  value={leave_type}
                />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Statut de la demande<span>*</span></label>
                <Select
                  name="status"
                  id="status"
                  options={options}
                  onChange={(selectedOption) => setStatusData(selectedOption.value)}
                  placeholder="Sélectionnez un statut..."
                  value={status}
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

export default ListeCongeEdit;