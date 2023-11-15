import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from '../../../../config';

const EditConge = ({handleClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const { nom_type, nombre_jour } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

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

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/leave/typeConge/${id}`);
            setData(res.data[0])
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);

const handleClick = async (e) => {
  e.preventDefault();

  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment modifier ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
  }).then((result) => {
    if (result.isConfirmed) {
      handleClick2();
    }
  });
};

const handleClick2 = async (e) => {

    try {
      await axios.put(`${DOMAIN}/api/leave/typeConge/${id}`, data);
      navigate("/typeCongé");
      Swal.fire({
        title: 'Success',
        text: 'le type a été modifié avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
        Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
      console.log(err);
    }
}

  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Modifier le type</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Nom de type<span>*</span></label>
                <input type="text" name='nom_type' value={nom_type} className="input-form" onChange={handleChange} required placeholder='Ecrire....' />
              </div>

              <div className="form-row">
                <label htmlFor="" className="label-form">Nombre de jour<span>*</span></label>
                <input type="number" name='nombre_jour' value={nombre_jour} className="input-form" onChange={handleChange} required />
              </div>
            </div>

            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditConge;