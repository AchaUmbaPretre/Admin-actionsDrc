import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from './../../../../config';

const FormAdd = ({handleClose, contratId, employeesId,fonction}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [clientEtat, setClientEtat] = useState([]);
  const [data, setData] = useState(null);
  const [selectData, setSelectData] = useState([]);
  const [competenceOption, setCompetenceOption] = useState([]);
  const [selectedx, setSelectedx] = useState([]);

  const navigate = useNavigate();

  const handleChange = (value, name) => {
    let formattedValue = value;
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };


  useEffect(()=>{

    const fetchDatas = async ()=> {
        try{
            const {data} = await axios.get(`${DOMAIN}/api/admin/fonction`);
            setSelectData(data)
    
          }catch(error){
            console.log(error)
          };
    }
    fetchDatas()
  }, [])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/admin/competence`);
      setCompetenceOption(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  }, []);

const employeesArray = Array.from(employeesId)
employeesArray.map((dd)=>{console.log(dd)})

const handleClick = async (e) => {
  e.preventDefault();
  handleClose();

  try {
    const contratEmploieResponse = await axios.post(`${DOMAIN}/api/admin/contratEmploie`, {
      ...data,
      contrat_id: contratId,
    });
    const contratEmploieId = contratEmploieResponse.data.contratEmploieId;

    await Promise.all(
      employeesArray.map(async (dd) => {
        await axios.post(`${DOMAIN}/api/admin/affectations`, {
          fonction_clientId: contratEmploieId,
          emploie_id: dd,
          contrat_id: contratId,
        });

        await axios.put(`${DOMAIN}/api/admin/employeFonctionPut/${dd}`, {
          contrat_id: contratId,
        });
      })
    );

    Swal.fire({
      title: 'Success',
      text: 'Contrat créé avec succès!',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    window.location.reload();
    navigate('/affectation');
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'OK',
    });

    console.log(err);
  }
};



  return (
    <>
      <div className="clientForm">
        <h2 className="client-h2">Formulaire de Fonction</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Domaine<span>*</span></label>
                <Select
                  name="skills"
                  onChange={(selectedOption) => handleChange(selectedOption.value, "skills")}
                  options={competenceOption.map((item) => ({
                    value: item.id,
                    label: item.nom
                    }))}
                />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Avantages<span>*</span></label>
                <input type="text" name='avantages' className="input-form" required onChange={(e) => handleChange(e.target.value, "avantages")} />
              </div>
            </div>

            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Prix<span>*</span></label>
                <input type="number" name='prix' className="input-form" required onChange={(e) => handleChange(e.target.value, "prix")} />
              </div>
              <div className="form-row">
                <label htmlFor="" className="label-form">Salaire<span>*</span></label>
                <input type="number" name='salaire' className="input-form" onChange={(e) => handleChange(e.target.value, "salaire")} />
              </div>
            </div>
            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormAdd;