import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import './contratForm.scss'

const ContratForm = () => {

const [data, setData] = useState({});
const navigate = useNavigate();
const [selectedAv, setSelectedAv] = useState([]);
const [statusContrat, setStatusContrat] = useState([]);
const [typeContrat, setTypeContrat] = useState([]);

const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

/*   const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/api/admin/contrat`, data);
      navigate("/contrats");
    } catch (err) {

      console.log(err);
    }
  } */

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/api/admin/contrat`, data);

      Swal.fire({
        title: 'Success',
        text: 'Contract created successfully!',
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

  useEffect(()=>{

    const fetchData = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/api/admin/avantages");
            setSelectedAv(res.data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

 useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/avantages");
          setSelectedAv(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
}, [])

useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/contratType");
          setTypeContrat(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
}, [])

useEffect(()=>{

  const fetchData = async ()=> {
      try{
          const res = await axios.get("http://localhost:8080/api/admin/statusContrat");
          setStatusContrat(res.data)
  
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
}, [])

console.log(data)
  return (
    <>
        <div className="contratForm">
            <div className="contrat-wrapper">
                <div className="edit-title">
                    <h2 className="edit-h2">Contrat</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Type du contrat <span>*</span></label>
                            <select id="pet-select" name="contract_type" className="input-form" onChange={handleChange}>
                            <option >selectionnez le type du contrat</option>
                            {typeContrat?.map(item =>( 
                                <option value={item.nom}>{item.nom}</option>
                              ))}
                            </select>
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de début <span>*</span></label>
                            <input type="date"  name="start_date" className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de la fin <span>*</span></label>
                            <input type="date" data-format="MM /jj/aaaa"  name='end_date' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Salaire <span>*</span></label>
                            <input type="number"   name='hourly_rate' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Avantages sociaux du contrat <span>*</span></label>
                            <select id="pet-select" name="benefits" onChange={handleChange} className="input-form">
                            <option >selectionnez l'avantage</option>
                              {selectedAv?.map(item =>( 
                                <option value={item.avantage_1}>{item.avantage_1}</option>
                              ))}
                            </select>
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status du contrat <span>*</span></label>
                            <select id="pet-select" name="contract_status" className="input-form" onChange={handleChange}>
                            <option >selectionnez le status du contrat</option>
                            {statusContrat?.map(item =>( 
                                <option value={item.nomContrat}>{item.nomContrat}</option>
                              ))}
                            </select>
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de l'engagement <span>*</span></label>
                            <input type="date" data-format="MM /jj/aaaa"  name='date_engagement' className="input-form" onChange={handleChange} />
                        </div>
                    </div>
                    <button className="edit-btn" onClick={handleClick}>Envoyer</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default ContratForm