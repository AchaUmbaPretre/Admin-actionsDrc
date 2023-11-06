import { useEffect, useRef, useState } from 'react'
import './edit.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import userImg from '../../../assets/user.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import Webcam from 'react-webcam';
import config from '../../../config';
import Select from 'react-select';
import Cropper from 'react-easy-crop';
import moment from 'moment';


const Edit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

const [data, setData] = useState({});
const {first_name, last_name,date_of_birth,etat_civil, gender, address, phone_number, email, number_inpp, number_cnss, nombre_enfant, identification_number,identification_type,skills,certifications,employment_status,source} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];
const [sources, setSources] = useState('import');
const [photo, setPhoto] = useState(null);
const [competenceOption, setCompetenceOption] = useState([]);
const [type, setType] = useState([]);
const [niveau, setNiveau] = useState([]);
const [statusE, setStatusE] = useState([]);
const webcamRef = useRef(null);
const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
  
const handleFileChange = (event) => {
  setPhoto(event.target.files[0]);
};

const handleSourceChange = (event) => {
  setSources(event.target.value);
};

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

  const handleSelectChange = (selectedOption, fieldName) => {
    setData((prev) => ({ ...prev, [fieldName]: selectedOption.value }));
  };
  
  const upload = async () => {
    try {
      if (source === 'webcam') {
        const screenshot = webcamRef.current.getScreenshot();
        const base64Data = screenshot.replace('data:image/webp;base64,', ''); // Enlever le préfixe du type de contenu
        const res = await axios.post(`${DOMAIN}/api/upload`, { source: base64Data });
        return res.data;
      } else {
        const formData = new FormData();
        formData.append('file', photo);
        const res = await axios.post(`${DOMAIN}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    
          // eslint-disable-next-line react-hooks/exhaustive-deps
          useEffect(() => {
            const fetchData = async () => {
              try {
                const res = await axios.get(`${DOMAIN}/api/admin/niveau`);
                setNiveau(res.data);
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
          }, []);
    
          // eslint-disable-next-line react-hooks/exhaustive-deps
          useEffect(() => {
            const fetchData = async () => {
              try {
                const res = await axios.get(`${DOMAIN}/api/admin/typepiece`);
                setType(res.data);
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
          }, []);

        // eslint-disable-next-line react-hooks/exhaustive-deps
          useEffect(() => {
            const fetchData = async () => {
              try {
                const {data} = await axios.get(`${DOMAIN}/api/admin/status`);
                setStatusE(data);
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
          }, []);

          useEffect(()=>{
            const fetchData = async ()=> {
                try{
                    const res = await axios.get(`${DOMAIN}/api/admin/views/${id}`);
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
        let photoSrc;
        if (source === 'import') {
          photoSrc = await upload();
        } else if (source === 'webcam') {
          photoSrc = webcamRef.current.getScreenshot();
        }
        await axios.put(`${DOMAIN}/api/admin/employe/${id}`,{ ...data, source: photoSrc });
      
        await Swal.fire({
          title: 'Success',
          text: 'Employé mis à jour avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate('/personnel');
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log(error);
      }
  }

  useEffect(() => {
    if (photo) {
      updateCropper();
    }
  }, [photo]);

  const updateCropper = () => {
    // Réinitialiser le recadrage et le zoom
    setCrop({ aspectRatio: 1 });
    setZoom(1);
  };


console.log(source)
  return (
    <>
        <div className="edit-person">
        <div className="formulaire-wrapper">
                <div className="formulaire-left">
                    {source ? <img src={`../upload/${source}`} className="form-img2"  /> : <img src={userImg} alt="" className="form-img" /> }
                    <div className="form-img-rows">
                        <div className="form-img-row">
                            <input type="radio" name="source" value="import" checked={source === 'import'} onChange={handleSourceChange} className='radio-img' />
                            <span className="form-title-img">Importer une photo</span>
                        </div>
                        <div>
                          <input type="file" name="photo" onChange={handleFileChange} />
                          {photo && (
                            <div className="crop-container">
                              <Cropper
                                image={URL.createObjectURL(photo)}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                minCropWidth={300}
                                minCropHeight={400} 
                              />
                            </div>
                          )}
                        </div>
                    </div>
                </div>
                <div className="formulaire-right">
                    <form action="" className="form-center">
                        <h2 className="form-h2"><span>*</span> Detail Personnel :</h2>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nom <span>*</span></label>
                                <input type="text" value={first_name}  name='first_name'  className="input-form" onChange={handleChange} placeholder='Entrez votre nom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Prenom <span>*</span></label>
                                <input type="text" value={last_name} name="last_name" className="input-form" onChange={handleChange} placeholder='Entrez votre postnom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Email <span>*</span></label>
                                <input type="text" value={email}  name='email' className="input-form" onChange={handleChange} placeholder='Entrez votre adresse email..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                                <input type="text" value={address}  name='address' required className="input-form" onChange={handleChange} placeholder='Entrez votre adresse..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Date de naissace <span>*</span></label>
                                <input type="date" value={moment(date_of_birth).format('YYYY-MM-DD') || ''} name="date_of_birth" required className="input-form" onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Etat civil <span>*</span></label>
                                <Select
                                  name="etat_civil"
                                  value={etat_civil}
                                  options={[
                                    { value: 'celibataire', label: 'Célibataire' },
                                    { value: 'marie(e)', label: 'Marié(e)' }
                                  ]}
                                  onChange={(selectedOption) => handleSelectChange(selectedOption, "etat_civil")}
                                />
                            </div>
                        </div>
                        <div className="form-rows">

                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nombre d'enfant <span>*</span></label>
                                <input type="number" value={nombre_enfant} name='nombre_enfant' className="input-form" onChange={handleChange} placeholder="Entrez votre nombre d'enfant.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Telephone <span>*</span></label>
                                <input type="tel" value={phone_number} name='phone_number' required className="input-form" onChange={handleChange} placeholder="Entrez votre numero de tel.."  />
                            </div>

                            <div className="form-row">
                                <label htmlFor="" className="label-form">Genre <span>*</span></label>
                                <div className="form-radio">
                                    <input type="radio" id="Choice1" onChange={handleChange} checked={gender === 'H'} name="gender" value="homme" />
                                    <label for="Choice1">Homme</label>
                                    <input type="radio" id="Choice2" onChange={handleChange} checked={gender === 'F'} name="gender" value="femme" />
                                    <label for="Choice2">Femme</label>
                                    <input type="radio" id="Choice3" onChange={handleChange} checked={gender === 'Autres'} name="gender" value="autres" />
                                    <label for="Choice3">autres</label>
                                </div>
                            </div>
                        </div>
                        <h2 className="form-h2"><span>*</span> Detail Professionel :</h2>
                        
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">N° INPP <span>*</span></label>
                                <input type="text" value={number_inpp} name='number_inpp' className="input-form" onChange={handleChange} placeholder="Entrez votre numero inpp.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">CNSS <span>*</span></label>
                                <input type="text" value={number_cnss} name='number_cnss' className="input-form" onChange={handleChange} placeholder="Entrez votre numero cnss.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Numero du pièce <span>*</span></label>
                                <input type="text" value={identification_number}  name='identification_number' required className="input-form" onChange={handleChange} placeholder='Entrez votre numero du pièce..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                              <label htmlFor="" className="label-form">
                                Type du pièce <span>*</span>
                              </label>
                              <select
                                className="input-form"
                                name="identification_type"
                                value={identification_type}
                                onChange={handleChange}
                              >
                                {type.map((item) => (
                                  <option key={item.nom_type} value={item.nom_type}>
                                    {item.nom_type}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="" className="label-form">
                                Domaine <span>*</span>
                              </label>
                              <select
                                className="input-form"
                                name="skills"
                                value={skills}
                                onChange={handleChange}
                              >
                                <option disabled value="">Selectionnez un domaine</option>
                                {competenceOption.map((item) => (
                                  <option key={item.nom} value={item.nom}>
                                    {item.nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="" className="label-form">
                                Niveau d'étude <span>*</span>
                              </label>
                              <select
                                className="input-form"
                                name="certifications"
                                value={certifications}
                                onChange={handleChange}
                              >
                                {niveau.map((item) => (
                                  <option key={item.titre} value={item.titre}>
                                    {item.titre}
                                  </option>
                                ))}
                              </select>
                            </div>
                        </div>
                        <div className="form-rows">
                          <div className="form-row">
                            <label htmlFor="pet-select" className="label-form">
                              Status <span>*</span>
                            </label>
                            <select
                              className="input-form"
                              name="employment_status"
                              value={employment_status}
                              onChange={handleChange}
                            >
                              {statusE.map((item) => (
                                <option key={item.nom_status} value={item.nom_status}>
                                  {item.nom_status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button className="form-btn" onClick={handleClick}>Envoyer <SendIcon className='form-icon' /></button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Edit