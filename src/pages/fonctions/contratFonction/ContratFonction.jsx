import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import Select from 'react-select';

const ContratFonction = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState(null);
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competenceOption, setCompetenceOption] = useState([]);
  const [departement, setDepartement] = useState([]);

  const navigate = useNavigate();

  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{

            const fetchData = async ()=> {
                try{
                    const {data} = await axios.get(`${DOMAIN}/api/admin/contrat`);
                    setSelectData(data)
                    setLoading(false);
                  }catch(error){
                    console.log(error)
                  };
            }
            fetchData()
    }, [])

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

useEffect(() => {
  const fetchData = async () => {
    try {
      const {data} = await axios.get(`${DOMAIN}/api/admin/departement`);
      setDepartement(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose()

    if (!data?.contrat_id || !data?.skills || !data?.avantages || !data?.prix || !data?.salaire ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
        await axios.post(`${DOMAIN}/api/admin/ContratInfo`,{
            ...data
          });
      Swal.fire({
        title: 'Success',
        text: 'Contrat créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      window.location.reload();
      navigate('/fonction');
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
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
                    <label htmlFor="" className="label-form">Contrat<span>*</span></label>
                    <Select
                        options={selectData.map((select) => ({
                            value: select.id,
                            label: select.company_name + ' / '+ select.contract_type +" / N° du contrat : "+select.id
                        }))}
                        onChange={(selectedOption) =>
                          handleChange(selectedOption.value, "contrat_id")
                        }
                    />
                </div>
            </div>
            <div className="form-rows">
              <div className="form-row">
                <label htmlFor="" className="label-form">Domaine<span>*</span></label>
                <Select
                  name="skills"
                  onChange={(selectedOption) => handleChange(selectedOption.value, "skills")}
                  options={departement.map((item) => ({
                  value: item.id,
                  label: item.nom_departement
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

export default ContratFonction;