import { useEffect, useState } from 'react'
import './editContrat.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import config from '../../../config'


const EditContrat = () => {
const DOMAIN = config.REACT_APP_SERVER_DOMAIN
const [data, setData] = useState({});
const {contract_type,client_id, start_date,end_date} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];
const [clientEtat, setClientEtat] = useState([]);


const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        text: 'Contract updated successfully!',
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
                            <label htmlFor="" className="label-edit">Type du contrat <span>*</span></label>
                            <input type="text" value={contract_type} name='contract_type'  className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Client(e) <span>*</span></label>
                            <select id="pet-select" value={client_id} name="client_id" className="input-form" onChange={handleChange}>
                              <option >selectionnez un client</option>
                              {clientEtat?.map(item =>( 
                                  <option value={item.id}>{item.company_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de début <span>*</span></label>
                            <input type="date" value={moment(start_date).format('YYYY-MM-DD') || ''} name="start_date" className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de la fin <span>*</span></label>
                            <input type="date"  value={moment(end_date).format('YYYY-MM-DD') || ''} data-format="MM /jj/aaaa" name='end_date' className="input-form" onChange={handleChange} />
                        </div>
                    </div>
  
                    <button className="edit-btn" onClick={handleClick}>Edit</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default EditContrat