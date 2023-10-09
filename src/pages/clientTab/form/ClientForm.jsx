import './clientForm.scss'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import Swal from 'sweetalert2';
import Select from 'react-select';


const ClientForm = ({handleModalClose}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [provinces, setProvinces] = useState([])
  const [pays, setPays] = useState([]);
  const [site, setSite] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);

  const handleLabelClick = () => {
    setInputVisible(!inputVisible);
  };

  const handleSiteChange = (e) => {
    const siteArray = e.target.value.split(',');

    const formattedSites = siteArray.map((value) => {
      const trimmedValue = value.trim();
      return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
    });
    setSite(formattedSites);
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  useEffect(()=>{
    const fetchData = async ()=> {
        try{
            const {data} = await axios.get(`${DOMAIN}/api/admin/province`);
            setProvinces(data)
          }catch(error){
            console.log(error)
          };
    }
    fetchData()
 }, [])

 useEffect(()=>{
  const fetchData = async ()=> {
      try{
          const {data} = await axios.get(`${DOMAIN}/api/admin/pays`);
          setPays(data)
        }catch(error){
          console.log(error)
        };
  }
  fetchData()
}, [])

  const handleClick = async (e) => {
    e.preventDefault();
    handleModalClose();

    if (!data.company_name || !data.address || !data.phone_number || !data.contact_name || !data.contact_email || !data.contact_phone || !data.province || !data.pays ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      const clientResponse = await axios.post(`${DOMAIN}/api/admin/clientPost`, data);

      await Swal.fire({
        title: 'Success',
        text: 'Client créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      window.location.reload();
      navigate('/client');
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
  
      console.log(error);
    }
  };


  return (
    <>
        <div className="clientForm">
          <h2 className="client-h2">Formulaire du client</h2>
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de compagnie <span>*</span></label>
                      <input type="text"  name='company_name' placeholder='Entrez le nom de la compagnie..'  className="input-form" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                      <input type="text" name="address" placeholder="Entrez l'adresse.."  className="input-form" onChange={handleChange}  />
                    </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel entreprise<span>*</span></label>
                    <input
                        type="tel"
                        name="phone_number"
                        className="input-form"
                        onChange={handleChange}
                        placeholder="Entrez le num de l'entreprise.." 
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Nom du contact principal<span>*</span></label>
                    <input type="tel"  name='contact_name' placeholder='Entrez le nom de contact principal..'  className="input-form" onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Email<span>*</span></label>
                    <input type='email' placeholder='Entrez ton adresse Mail..'  pattern=".+@globex\.com" size="30" required name='contact_email' className="input-form" onChange={handleChange}  />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel principal<span>*</span></label>
                    <input type="tel" name='contact_phone' className="input-form" placeholder='Entrez le num principal..'  onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Rccm<span>*</span></label>
                    <input type="text" name='rccm' placeholder='Entrez le code Rccm..'  className="input-form" onChange={handleChange} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Id nate<span>*</span></label>
                    <input type="text" name='idnate' className="input-form" placeholder="Entrez le code l'Id nate.."  onChange={handleChange} />
                  </div>
                </div>
                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Pays<span>*</span></label>
                    <Select
                      name="pays"
                      options={pays?.map(item => ({ value: item.nom, label: item.nom }))}
                      onChange={selectedOption => handleChange({ target: { name: 'pays', value: selectedOption.value } })}
                    />
                </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Province<span>*</span></label>
                    <Select
                      name="province"
                      options={provinces?.map(item => ({ value: item.nom, label: item.nom }))}
                      onChange={selectedOption => handleChange({ target: { name: 'province', value: selectedOption.value } })}
                    />
                  </div>
                </div>
                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">APR<span>*</span></label>
                    <input type="text" name='apr' className="input-form" placeholder="Entrez le code APR.."  onChange={handleChange} />
                  </div>
                </div>  
                <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
              </form>
            </div>
        </div>

    </>
  )
}

export default ClientForm