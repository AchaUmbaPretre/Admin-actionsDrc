import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useState } from 'react';
import './departementForm.scss'
import config from '../../../config'
import Swal from 'sweetalert2';

const DepartementForm = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState('');


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedData = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setData(capitalizedData);
  };

const handleClick = async (e) => {
  e.preventDefault();
  handleModalClose()

  if(!data){
    Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir le champ',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
  }

  try {
    await axios.post(`${DOMAIN}/api/admin/departement`, {nom_departement : data});
    Swal.fire({
      icon: 'success',
      title: 'Département créé avec succès!',
      icon: 'success',
    });
    window.location.reload();
  } catch (error) {
    await Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
  }
}

  return (
    <>
        <div className="departementForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <h1 className="title-h1">Département</h1>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de département <span>*</span></label>
                      <input type="text" name='nom_departement' placeholder='Saisir le nom de département....' className="input-form" onChange={handleInputChange} />
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