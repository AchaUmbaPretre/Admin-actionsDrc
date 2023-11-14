import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from '../../../../config';

const TypeCongForm = ({handleClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    if (fieldName === "email") {
      const lowercaseValue = fieldValue.charAt(0).toLowerCase() + fieldValue.slice(1);
      setData((prev) => ({ ...prev, [fieldName]: lowercaseValue }));
    } else if (Number.isNaN(Number(fieldValue))) {
      const capitalizedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      setData((prev) => ({ ...prev, [fieldName]: capitalizedValue }));
    } else {
        setData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    }

  }

  console.log(data)

  const handleClick = async (e) => {
    e.preventDefault();
    handleClose()
    try {
      await axios.post(`${DOMAIN}/api/leave/typeConge`, data);
      Swal.fire({
        title: 'Success',
        text: 'Le type de congé a été enregistrée avec succès !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/typeCongé');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Type de presences</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Nom de type<span>*</span></label>
                <input type="text" name='nom_type' className="input-form" onChange={handleChange} required placeholder='Ecrire....' />
              </div>

              <div className="form-row">
                <label htmlFor="" className="label-form">Nombre de jour<span>*</span></label>
                <input type="number" name='nombre_jour' className="input-form" onChange={handleChange} required />
              </div>
            </div>

            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TypeCongForm;