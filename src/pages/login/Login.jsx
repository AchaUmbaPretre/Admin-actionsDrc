import './login.scss';
import LoginIcon from '@mui/icons-material/Login';
import actions from './../../assets/actionssarl.PNG';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { Login, errorMessage } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Login(inputs);
      toast.success('Connecté avec succès!', {
        position: 'top-right',
      });
      navigate('/');
    } catch (error) {
      toast.error('Mot de passe incorrect', {
        position: 'top-right',
      });
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-wrapper">
          <div className="login-entete">
            <img src={actions} alt="" className="login-img" />
            <h2 className="login-h2">Actions Drc</h2>
          </div>
          <form action="" className="login-form">
            <div className="login-controle">
              <label htmlFor="" className="login-label">
                Votre email <span>*</span>
              </label>
              <input
                type="text"
                name="email"
                className="login-input"
                onChange={handleChange}
                placeholder="Email.."
              />
            </div>
            <div className="login-controle">
              <label htmlFor="" className="login-label">
                Mot de passe <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                className="login-input"
                onChange={handleChange}
                placeholder="mot de passe.."
              />
            </div>
            <div className="login-rows">
              <Link className="login-mssg">Mot de passe oublié ?</Link>
              <button className="btn-form" onClick={handleSubmit}>
                <LoginIcon className="form-icon" />
                S'identifier
              </button>
            </div>
          </form>
          <div className="form-bottom">
            <span>Nouveau sur actionsdrc ?</span>
            <Link className="form-news" to={'/register'}>
              Créez votre compte maintenant !
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Login;