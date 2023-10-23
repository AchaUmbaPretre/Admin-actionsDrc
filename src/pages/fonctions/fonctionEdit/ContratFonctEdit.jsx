import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';


const ContratFonctionEdit = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [clientEtat, setClientEtat] = useState([]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [data, setData] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competenceOption, setCompetenceOption] = useState([]);
  const {avantages, contrat_id, prix, salaire, skills} = data;

  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/contratFonctionOne/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{

            const fetchData = async ()=> {
                try{
                    const {data} = await axios.get(`${DOMAIN}/api/admin/contrat`);
                    setSelectData(data)
                    setLoading(false);
                  }catch(error){
                    console.log(error)
                  };
            }
            fetchData()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await axios.get(`${DOMAIN}/api/admin/competence`);
              setCompetenceOption(res.data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
}, []);

const handleClick = async (e) => {
  e.preventDefault();

  try {
    await axios.put(`${DOMAIN}/api/admin/contratFonctionUpdate/${id}`, data);

    Swal.fire({
      title: 'Success',
      text: 'Fonction mis à jour avec succès !',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    navigate('/fonction');
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });

    console.log(err);
  }
};

console.log(data)

  return (
    <>
      <div className="ediitForm">
        <h2 className="client-h2">Modifier la fonction</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
                <div className="form-row">
                    <label htmlFor="" className="label-form">Contrat<span>*</span></label>
                    <select name="contrat_id" value={contrat_id} onChange={(e) => handleChange(e.target.value, "contrat_id")} className="input-form">
                      <option value="" disabled>Selectionnez un domaine</option>
                      {selectData.map((item)=> (
                      <option value={item.id}>{item.company_name}</option>
                      ))}
                    </select>
                </div>
            </div>
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Domaine<span>*</span></label>
                <select name="skills" value={skills} onChange={(e) => handleChange(e.target.value, "skills")} className="input-form">
                  <option value="" disabled>Selectionnez un domaine</option>
                  {competenceOption.map((item)=> (
                  <option value={item.id}>{item.nom}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Avantages<span>*</span></label>
                <input type="text" value={avantages} name='avantages' className="input-form" required onChange={(e) => handleChange(e.target.value, "avantages")} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Prix<span>*</span></label>
                <input type="number" name='prix' value={prix} className="input-form" required onChange={(e) => handleChange(e.target.value, "prix")} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Salaire<span>*</span></label>
                <input type="number" name='salaire' value={salaire} className="input-form" onChange={(e) => handleChange(e.target.value, "salaire")} />
              </div>
            </div>
            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContratFonctionEdit ;