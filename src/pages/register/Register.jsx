import './register.scss'
import { Link } from 'react-router-dom';
import actions from './../../assets/actionssarl.PNG'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Register = () => {
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
                        <input type="text" className="login-input" placeholder='Nom..' />
                    </div>
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Votre e-mail <span>*</span></label>
                        <input type="text" className="login-input" placeholder='Email..' />
                    </div>
                    <div className="login-controle">
                        <label htmlFor="" className="login-label">Mot de passe <span>*</span></label>
                        <input type="text" className="login-input" placeholder='Mot de passe..' />
                    </div>
                    <div className="login-rows">
                        <Link className="login-mssg">Mot de passe oublié ?</Link>
                        <button className="btn-form"><CheckCircleOutlineIcon/>S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>


    </>
  )
}

export default Register