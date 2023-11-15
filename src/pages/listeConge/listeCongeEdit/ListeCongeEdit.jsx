import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import moment from 'moment';


const ListeCongeEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(true);
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
  console.log(data)

  useEffect(()=>{

  },[])

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
        await axios.put(`${DOMAIN}/api/leave/demandeConge/${id}`, data);
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
      <div className="ediitForm">
        <h2 className="client-h2">Modifier le demande de congé</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
            <div className="form-row">
                <label htmlFor="" className="label-form">
                    Employé(e) <span>*</span>
                </label>
                <select
                    name='employee_id'
                    value={employee_id}
                    onChange={handleChange}
                    required
                    className="input-form"
                >
                    <option value="">Sélectionnez l'employé(e)</option>
                    {selected.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.first_name}
                    </option>
                    ))}
                </select>
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
                <select
                    name='leave_type'
                    value={leave_type}
                    onChange={handleChange}
                    required
                    className="input-form"
                >
                    <option value="">Sélectionnez un type de congé</option>
                    {type.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nom_type}
                    </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Statut de la demande<span>*</span></label>
                <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={handleChange}
                    required
                    className="input-form"
                >
                    <option value="">Sélectionnez un statut...</option>
                    {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
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

export default ListeCongeEdit;