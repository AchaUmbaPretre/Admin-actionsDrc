import { useEffect, useState } from 'react'
import './editContrat.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import config from '../../../config'
import Select from 'react-select';


const EditContrat = () => {
const DOMAIN = config.REACT_APP_SERVER_DOMAIN
const [data, setData] = useState({});
const {contract_type,client_id, start_date,end_date} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];
const [clientEtat, setClientEtat] = useState([]);
const [typeContrat, setTypeContrat] = useState([]);


const handleChange = (name, value) => {
  if (name === 'start_date' || name === 'end_date') {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    setData((prev) => ({ ...prev, [name]: formattedDate }));
  } else {
    setData((prev) => ({ ...prev, [name]: value }));
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/admin/contratType`);
        setTypeContrat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/contrat/views/${id}`);
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

    try {
      await axios.put(`${DOMAIN}/api/admin/contrat/${id}`, data);

      Swal.fire({
        title: 'Success',
        text: 'Contrat mis à jour avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/contrats');
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


  return (
    <>
        <div className="edit">
            <div className="edit-wrapper">
                <div className="edit-title">
                    <h2 className="edit-h2">Modifier le contrat</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                          <label htmlFor="contract_type" className="label-edit">Type du contrat <span>*</span></label>
                          <select
                            value={contract_type}
                            name="contract_type"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="Sélectionnez le type du contrat"
                            className="input-form"
                          >
                            <option value="">Sélectionnez le type du contrat</option>
                            {typeContrat?.map((item) => (
                              <option key={item.nom} value={item.nom}>{item.nom}</option>
                            ))}
                          </select>
                        </div>
                        <div className="edit-row">
                          <label htmlFor="client_id" className="label-edit">Client(e) <span>*</span></label>
                          <select
                            id="client_id"
                            value={client_id}
                            name="client_id"
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="Sélectionnez un client"
                            className="input-form"
                          >
                            <option value="">Sélectionnez un client</option>
                            {clientEtat?.map((item) => (
                              <option key={item.id} value={item.id}>{item.company_name}</option>
                            ))}
                          </select>
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de début <span>*</span></label>
                            <input type="date" value={moment(start_date).format('YYYY-MM-DD') || ''} name="start_date" className="input-form" onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            } />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de la fin <span>*</span></label>
                            <input type="date"  value={moment(end_date).format('YYYY-MM-DD') || ''} data-format="MM /jj/aaaa" name='end_date' className="input-form" onChange={(e) =>
                    handleChange(e.target.name, e.target.value)
                             } />
                        </div>
                    </div>
  
                    <button className="edit-btn" onClick={handleClick}>Envoyer</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default EditContrat