import { useEffect, useState } from 'react'
import './edit.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Edit = () => {

const [data, setData] = useState({});
const {first_name, last_name,date_of_birth, gender,address, phone_number,email, identification_number,identification_type,skills, certifications,employment_status} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];


const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`http://localhost:8080/api/admin/views/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/admin/employe/${id}`, data);
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
                    <h2 className="edit-h2">Edite</h2>
                </div>
                <form action="" className="formulaire-edit">
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Nom*</label>
                            <input type="text" value={first_name} name='first_name'  className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Prenom*</label>
                            <input type="text" value={last_name} name="last_name" className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Email*</label>
                            <input type="text" value={email}  name='email' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Adresse*</label>
                            <input type="text" value={address}  name='address' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Numero du pièce*</label>
                            <input type="text" value={identification_number}  name='identification_number' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Type du pièce*</label>
                            <input type="text" value={identification_type}  name='identification_type' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Competence*</label>
                            <input type="text" value={skills}  name='skills' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Certificat*</label>
                            <input type="text" value={certifications}  name='certifications' className="input-form" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Telephone*</label>
                            <input type="text" value={phone_number}  name='address' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status*</label>
                            <input type="text" value={employment_status}  className="input-form" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date*</label>
                            <input type="date" value={date_of_birth}  name="date_of_birth" className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Genre*</label>
                            <div className="edit-radio">
                                <input type="radio" defaultValue={gender} id="Choice1" onChange={handleChange} name="gender" value="homme" />
                                <label for="Choice1">Homme</label>
                                <input type="radio" defaultValue={gender}  id="Choice2" onChange={handleChange} name="gender" value="femme" />
                                <label for="Choice2">Femme</label>
                            </div>
                        </div>
                    </div>
                    <button className="edit-btn" onClick={handleClick}>Edit</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default Edit