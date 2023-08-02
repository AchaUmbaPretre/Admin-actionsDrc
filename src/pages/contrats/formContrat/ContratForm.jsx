import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const ContratForm = () => {

const [data, setData] = useState({});
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];


const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/admin/contrat/${id}`, data);
      navigate("/");
    } catch (err) {

      console.log(err);
    }
  }


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
                            <input type="text"  name='contract_type'  className="input-form" onChange={handleChange} />
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
                            <input type="text"  name='benefits' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status du contrat <span>*</span></label>
                            <select id="pet-select" name="identification_type" className="input-form" onChange={handleChange}>
                                    <option value="actif">actif</option>
                                    <option value="terminé">terminé</option>
                                    <option value="résilié">résilié</option>
                            </select>
                        </div>
                    </div>
                    <button className="edit-btn" onClick={handleClick}>Edit</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default ContratForm