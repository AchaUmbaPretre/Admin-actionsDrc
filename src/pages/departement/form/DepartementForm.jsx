import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './departementForm.scss'
import config from '../../../config'
import Swal from 'sweetalert2';

const DepartementForm = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState('');


const handleClick = async (e) => {
  e.preventDefault();
  handleModalClose()

  try {
    await axios.post(`${DOMAIN}/api/admin/departement${data}`);

    Swal.fire({
      icon: 'success',
      title: 'Mise à jour réussie',
      text: 'La mise à jour a été effectuée avec succès.',
    });
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
        <div className="departementForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <h1 className="title-h1">Département</h1>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de département <span>*</span></label>
                      <input type="text"  name='nom_departement' placeholder='Saisir le nom de département....' className="input-form" onChange={(e)=>setData(e.target.value)} />
                    </div>
                </div>  
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default DepartementForm