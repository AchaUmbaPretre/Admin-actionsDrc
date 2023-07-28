import './login.scss'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import actions from './../../assets/actionssarl.PNG'
const Login = () => {
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
                        <label htmlFor="" className="login-label">Votre e-mail <span>*</span></label>
                        <input type="text" className="login-input" placeholder='Email..' />
                    </div>
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Mot de passe <span>*</span></label>
                        <input type="text" className="login-input" placeholder='mot de passe..' />
                    </div>
                    <div className="login-rows">
                        <Link className="login-mssg">Mot de passe oublié ?</Link>
                        <button className="btn-form"><LoginIcon/>S'identifier</button>
                    </div>
                </form>
            </div>
        </div>

    </>
  )
}

export default Login