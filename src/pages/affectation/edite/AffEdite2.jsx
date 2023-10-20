import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import Select from 'react-select';
import './affEdite.scss'

const AffEdite2 = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competenceOption, setCompetenceOption] = useState([]);
  const { avantages, contrat_id, skills, prix, salaire } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const handleChange = (value, name) => {
    let formattedValue = value;
  
    if (typeof value === 'string' && value.length > 0) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  console.log(data)

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const res = await axios.get(`${DOMAIN}/api/admin/affectation/${id}`);
            setData(res.data[0])
    
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
}, [id]);

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
            const res = await axios.get(`${DOMAIN}/api/admin`);
            setCompetenceOption(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${DOMAIN}/api/admin/affectationPut/${id}`, data);
      navigate("/affectation");
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
      <div className="affEdite">
        <h2 className="client-h2">Modifier l'affectation</h2>
        <div className="clientForm-wrapper">
          <form action="" className="form-center">
            <div className="form-rows">
                <div className="form-row">
                    <label htmlFor="" className="label-form">Contrat<span>*</span></label>
                    <Select
                        value={contrat_id}
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
                <label htmlFor="" className="label-form">Agent<span>*</span></label>
                <Select
                    value={skills}
                  name="skills"
                  onChange={(selectedOption) => handleChange(selectedOption.value, "skills")}
                  options={competenceOption.map((item) => ({
                    value: item.id,
                    label: item.first_name
                    }))}
                />
              </div>
            </div>
            <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AffEdite2;