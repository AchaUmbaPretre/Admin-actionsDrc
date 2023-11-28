import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import Select from 'react-select';
import './affEdite.scss'

const AffEdite = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competenceOption, setCompetenceOption] = useState([]);
  const { contrat_id,emploie_id } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

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
            const res = await axios.get(`${DOMAIN}/api/admin/affectation/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);

console.log(data)

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
            const res = await axios.get(`${DOMAIN}/api/admin`);
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
      await axios.put(`${DOMAIN}/api/admin/affectationPut/${id}`, data);
      navigate("/affectation");
      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie',
        text: 'La mise à jour a été effectuée avec succès.',
      });
    } catch (err) {
      console.log(err);
    }
   
  };

  return (
    <>
      <div className="affEdite">
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
          <h2 className="client-h2">Modifier l'affectation</h2>
            <div className="form-rows">
                <div className="form-row">
                    <label htmlFor="" className="label-form">Contrat<span>*</span></label>
                    <select name="contrat_id" id="" value={contrat_id} className='input-form' onChange={(e)=> handleChange(e.target.value, "contrat_id")}>
                      <option value="" disabled>Selectionnez...</option>
                      {
                        selectData.map((select)=>(
                      <option value={select.id}>{select.company_name} {'/ type du contrat' + select.contract_type + " / N° du contrat : "+select.id}</option>
                    ))
                  }
                    </select>
                </div>
            </div>
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Agent<span>*</span></label>
                <select name="emploie_id" value={emploie_id} id="" className='input-form' onChange={(e)=> handleChange(e.target.value, "emploie_id")}>
                  <option value="" disabled>selectionnez....</option>
                  {
                    competenceOption.map((item)=>(
                      <option value={item.id}>{item.first_name}</option>
                    ))
                  }
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

export default AffEdite;