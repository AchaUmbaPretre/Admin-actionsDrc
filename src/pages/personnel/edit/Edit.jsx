import { useState } from 'react'
import './edit.scss'
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {

const [data, setData] = useState({});
const {first_name} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];

const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await axios.put(`http://localhost:8080/api/admin/${id}`, data);
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
                            <input type="text" name="last_name" className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Email*</label>
                            <input type="text" name='email' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Adresse*</label>
                            <input type="text" name='address' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Numero du pièce*</label>
                            <input type="text" name='identification_number' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Type du pièce*</label>
                            <input type="text" name='identification_type' className="input-form" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Competence*</label>
                            <input type="text" name='skills' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Certificat*</label>
                            <input type="text" name='certifications' className="input-form" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Adresse*</label>
                            <input type="text" name='address' className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Status*</label>
                            <input type="text" className="input-form" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="edit-rows">
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Date*</label>
                            <input type="Date" name="date_of_birth" className="input-form" onChange={handleChange} />
                        </div>
                        <div className="edit-row">
                            <label htmlFor="" className="label-edit">Genre*</label>
                            <div className="edit-radio">
                                <input type="radio" id="Choice1" onChange={handChange} name="gender" value="homme" />
                                <label for="Choice1">Homme</label>

                                <input type="radio" id="Choice2" onChange={handChange} name="gender" value="femme" />
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