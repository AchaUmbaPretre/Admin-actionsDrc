import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config'
import Swal from 'sweetalert2';
import BarReturn from '../../../components/barReturn/BarReturn';

const  DepartementEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const id = location.pathname.split("/")[2];
  const { nom_departement } = data;


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedData = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setData(capitalizedData);
  };

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/departement/${id}`);
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
      await axios.put(`${DOMAIN}/api/admin/departement/${id}`, {nom_departement: data});
      navigate("/departement");
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
        <BarReturn/>
        <div className="departementForm">
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <h1 className="title-h1">Modifier le département</h1>
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de département <span>*</span></label>
                      <input type="text" value={nom_departement}  placeholder='Saisir le nom de département....' className="input-form" onChange={handleInputChange} />
                    </div>
                </div>  
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>
    </>
  )
}

export default DepartementEdit