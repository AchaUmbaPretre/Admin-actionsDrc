import './register.scss'
import { Link } from 'react-router-dom';
import actions from './../../assets/actionssarl.PNG'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleChange = e =>{
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handSubmit = async (e) =>{
        e.preventDefault();
        try{
          await axios.post("http://localhost:8080/api/auth/register", inputs);
          navigate('/login')
          
        }catch(error){
          setError(error.response.data)
          
        } 
    
      }
  return (
    <>
         <div className="register">
            <div className="register-wrapper">
                <div className="register-entete">
                    <img src={actions} alt="" className="login-img" />
                    <h2 className="login-h2">Actions Drc</h2>
                </div>
                <form action="" className="login-form">
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Votre nom <span>*</span></label>
                        <input type="text" name='username' className="login-input" onChange={handleChange} placeholder='Nom..' />
                    </div>
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Votre e-mail <span>*</span></label>
                        <input type="text" name='email' className="login-input" onChange={handleChange} placeholder='Email..' />
                    </div>
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Mot de passe <span>*</span></label>
                        <input type="text"  name='password' className="login-input" onChange={handleChange} placeholder='Mot de passe..' />
                    </div>
                    <div className="login-rows">
                        <Link className="login-mssg" to ='/register'>Mot de passe oublié ?</Link>
                        <button className="btn-form" onClick={handSubmit} ><CheckCircleOutlineIcon className='form-icon'/>S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>


    </>
  )
}

export default Register