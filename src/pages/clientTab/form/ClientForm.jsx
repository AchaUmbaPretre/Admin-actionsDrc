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
  
    try {
      const clientResponse = await axios.post(`${DOMAIN}/api/admin/clientPost`, data);
      const { clientId } = clientResponse.data;
      console.log(clientId)
        await Promise.all(
        site.map((item) =>
          axios.post(`${DOMAIN}/api/admin/sites`, {
            client_id: clientId,
            nom_site: item.trim()
          })
        )
      );

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
            <div className="clientForm-wrapper">
              <form action="" className="form-center">
                <div className="form-rows">
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Nom de compagnie <span>*</span></label>
                      <input type="text"  name='company_name'  className="input-form" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                      <input type="text" name="address" className="input-form" onChange={handleChange}  />
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
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Nom du contact principal<span>*</span></label>
                    <input type="tel"  name='contact_name' className="input-form" onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Email<span>*</span></label>
                    <input type='email' pattern=".+@globex\.com" size="30" required name='contact_email' className="input-form" onChange={handleChange}  />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Tel principal<span>*</span></label>
                    <input type="tel" name='contact_phone' className="input-form" onChange={handleChange} />
                  </div>
                </div>

                <div className="form-rows">
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Rccm<span>*</span></label>
                    <input type="text" name='rccm' className="input-form" onChange={handleChange} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="" className="label-form">Id nate<span>*</span></label>
                    <input type="text" name='idnate' className="input-form" onChange={handleChange} />
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
                    <input type="text" name='apr' className="input-form" onChange={handleChange} />
                  </div>
                  <div className="form-row">
                  {!inputVisible ? (
                    <label
                      htmlFor=""
                      className="label-form"
                      onClick={handleLabelClick}
                      style={{ cursor: "pointer" }}
                    >
                      Cliquez ici pour ajouter des Sites<span>*</span>
                    </label>
                  ) : (
                    <label htmlFor="" className="label-form">
                      Sites<span>*</span>
                    </label>
                  )}
                  {inputVisible && (
                    <input
                      type="text"
                      name="nom_site"
                      className="input-form"
                      onChange={handleSiteChange}
                    />
                  )}
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