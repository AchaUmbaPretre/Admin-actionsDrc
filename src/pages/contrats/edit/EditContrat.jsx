import { useEffect, useState } from 'react'
import './editContrat.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const EditContrat = () => {

const [data, setData] = useState({});
const {contract_type, start_date,end_date, hourly_rate,benefits, contract_status} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];


const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`http://localhost:8080/api/admin/contrat/views/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);
    
/*   const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/admin/contrat/${id}`, data);
      navigate("/contrats");
    } catch (err) {

      console.log(err);
    }
  } */

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/admin/contrat/${id}`, data);

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
                    <h2 className="edit-h2">Editer contrat</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Type du contrat <span>*</span></label>
                            <input type="text" value={contract_type} name='contract_type'  className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de début <span>*</span></label>
                            <input type="date" value={start_date} name="start_date" className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date de la fin <span>*</span></label>
                            <input type="date" data-format="MM /jj/aaaa" value={end_date}  name='end_date' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Salaire <span>*</span></label>
                            <input type="number" value={hourly_rate}  name='hourly_rate' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Avantages sociaux du contrat <span>*</span></label>
                            <input type="text" value={benefits}  name='benefits' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status du contrat <span>*</span></label>
                            <input type="text" value={contract_status}  name='contract_status' className="input-form" onChange={handleChange} />
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