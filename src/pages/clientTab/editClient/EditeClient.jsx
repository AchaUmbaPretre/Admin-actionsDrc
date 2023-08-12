import './editeClient.scss'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditeClient = () => {
const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const id = location.pathname.split("/")[2];
  const {company_name, address, phone_number,contact_name,contact_email, rccm, idnate} = data;
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`http://localhost:8080/api/admin/viewsClient/${id}`);
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
      await axios.put(`http://localhost:8080/api/admin/client/${id}`, data);
      navigate("/");
    } catch (err) {

      console.log(err);
    }
  }


  return (
    <>
        <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
              <h1 className="title-h1">Edite</h1>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de compagnie <span>*</span></label>
                      <input type="text"  name='company_name' value={company_name} className="input-form" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                      <input type="text" name="address" value={address} className="input-form" onChange={handleChange}  />
                    </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel entreprise<span>*</span></label>
                      <input type="number"  name='phone_number' value={phone_number} className="input-form" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom du contact principal<span>*</span></label>
                      <input type="text"  name='contact_name' value={contact_name} className="input-form" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Email<span>*</span></label>
                    <input type="text" name='contact_email' className="input-form" value={contact_email} onChange={handleChange}  />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel principal<span>*</span></label>
                    <input type="number" name='contact_phone' className="input-form" value={rccm} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Rccm<span>*</span></label>
                    <input type="number" name='rccm' className="input-form" value={idnate} onChange={handleChange} />
                </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Id nate<span>*</span></label>
                    <input type="number" name='idnate' className="input-form" value={idnate} onChange={handleChange} />
                  </div>
                </div>
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default EditeClient