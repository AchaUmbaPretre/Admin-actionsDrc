import './clientForm.scss'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async(e) =>{
    e.preventDefault();

    try{
        await axios.post(`http://localhost:8080/api/admin/clientPost`, data)

        navigate("/client")
    }
    catch(error){
        console.log(error)
    }
}

  return (
    <>
        <div className="clientForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de compagnie <span>*</span></label>
                      <input type="text"  name='company_name'  className="input-form" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                      <input type="text" name="address" className="input-form" onChange={handleChange}  />
                    </div>
                </div>

                <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Tel entreprise<span>*</span></label>
                                <input type="number"  name='phone_number' className="input-form" onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nom du contact principal<span>*</span></label>
                                <input type="text"  name='contact_name' className="input-form" onChange={handleChange} />
                            </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Email<span>*</span></label>
                    <input type="text" name='contact_email' className="input-form" onChange={handleChange}  />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel principal<span>*</span></label>
                    <input type="number" name='contact_phone' className="input-form" onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Rccm<span>*</span></label>
                    <input type="number" name='rccm' className="input-form" onChange={handleChange} />
                </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Id nate<span>*</span></label>
                    <input type="number" name='idnate' className="input-form" onChange={handleChange} />
                  </div>
                </div>
                        
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default ClientForm