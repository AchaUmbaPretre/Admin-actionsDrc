import { useEffect, useRef, useState } from 'react';
import './formulaire.scss'
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import userImg from './../../../assets/user.png'
import Webcam from 'react-webcam';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config'
import Cropper from 'react-easy-crop';
moment.locale('fr');


const Formulaire = ({handleModalClose}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [source, setSource] = useState('import');
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
        setSource(event.target.value);
      };
      const handleSelectChange = (selectedOption, fieldName) => {
        setData((prev) => ({ ...prev, [fieldName]: selectedOption.value }));
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

      const handlePhotoSubmit = async () => {

        handleModalClose()
        try {
          let photoSrc;
          if (source === 'import') {
            photoSrc = await upload();
          } else if (source === 'webcam') {
            photoSrc = webcamRef.current.getScreenshot();
          }
          
          await axios.post(`${DOMAIN}/api/admin/employe`, { ...data, source: photoSrc });
        
          await Swal.fire({
            title: 'Success',
            text: 'Employé créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          window.location.reload();
          navigate("/personnel")
         
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


  return (
    <>
        <div className="formulaire-person">
            <div className="formulaire-wrapper">
                <div className="formulaire-left">
                    {photo ? <img src={URL.createObjectURL(photo)} className="form-img2"/> : <img src={userImg} alt="" className="form-img" /> }
                    <div className="form-img-rows">
                        <div className="form-img-row">
                            <input type="radio" name="source" value="import" checked={source === 'import'} onChange={handleSourceChange} className='radio-img' />
                            <span className="form-title-img">Importer une photo</span>
                        </div>
                        <div className="form-img-row">
                            <input type="radio" name="source" value="webcam" checked={source === 'webcam'} onChange={handleSourceChange} className='radio-img' />
                            <span className="form-title-img">Prendre une photo avec la webcam</span>
                        </div>
                        {source === 'import' && <div>
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
                        </div>  }
                        {source === 'webcam' &&  <div>
                          <Webcam audio={false} ref={webcamRef} className="pop-img" />
                          <div className="crop-container">
                            <Cropper
                              image={webcamRef.current?.getScreenshot()}
                              crop={crop}
                              zoom={zoom}
                              aspect={1}
                              onCropChange={setCrop}
                              onZoomChange={setZoom}
                            />
                          </div>
                        </div>}
                    </div>
                </div>
                <div className="formulaire-right">
                    <form action="" className="form-center">
                        <h2 className="form-h2"><span>*</span> Detail Personnel :</h2>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nom <span>*</span></label>
                                <input type="text"  name='first_name'  className="input-form" onChange={handleChange} placeholder='Entrez votre nom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Prenom <span>*</span></label>
                                <input type="text" name="last_name" className="input-form" onChange={handleChange} placeholder='Entrez votre postnom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Email <span>*</span></label>
                                <input type="text"  name='email' className="input-form" onChange={handleChange} placeholder='Entrez votre adresse email..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                                <input type="text"  name='address' required className="input-form" onChange={handleChange} placeholder='Entrez votre adresse..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Date de naissace <span>*</span></label>
                                <input type="date" name="date_of_birth" required className="input-form" onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Etat civil <span>*</span></label>
                                <Select
                                  name="etat_civil"
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
                                <input type="number"  name='nombre_enfant' required className="input-form" onChange={handleChange} placeholder="Entrez votre nombre d'enfant.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Telephone <span>*</span></label>
                                <input type="tel" name='phone_number' required className="input-form" onChange={handleChange} placeholder="Entrez votre numero de tel.."  />
                            </div>

                            <div className="form-row">
                                <label htmlFor="" className="label-form">Genre <span>*</span></label>
                                <div className="form-radio">
                                    <input type="radio" id="Choice1" onChange={handleChange} name="gender" value="homme" />
                                    <label for="Choice1">Homme</label>
                                    <input type="radio" id="Choice2" onChange={handleChange} name="gender" value="femme" />
                                    <label for="Choice2">Femme</label>
                                    <input type="radio" id="Choice3" onChange={handleChange} checked name="gender" value="autres" />
                                    <label for="Choice3">autres</label>
                                </div>
                            </div>
                        </div>
                        <h2 className="form-h2"><span>*</span> Detail Professionel :</h2>
                        
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">N° INPP <span>*</span></label>
                                <input type="text"  name='number_inpp' required className="input-form" onChange={handleChange} placeholder="Entrez votre numero inpp.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">CNSS <span>*</span></label>
                                <input type="text" name='number_cnss' required className="input-form" onChange={handleChange} placeholder="Entrez votre numero cnss.." />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Numero du pièce <span>*</span></label>
                                <input type="number"  name='identification_number' required className="input-form" onChange={handleChange} placeholder='Entrez votre numero du pièce..' />
                            </div>
                        </div>

                        <div className="form-rows">

                            <div className="form-row">
                                <label htmlFor="" className="label-form">Type du pièce <span>*</span></label>
                                <Select
                                    name="identification_type"
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, "identification_type")}
                                    options={type.map((item) => ({
                                        value: item.nom_type,
                                        label: item.nom_type
                                    }))}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Competence <span>*</span></label>
                                <Select
                                    name="skills"
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, "skills")}
                                    options={competenceOption.map((item) => ({
                                        value: item.nom,
                                        label: item.nom
                                    }))}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Niveau d'étude <span>*</span></label>
                                <Select
                                    name="certifications"
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, "certifications")}
                                    options={niveau.map((item) => ({
                                        value: item.titre,
                                        label: item.titre
                                    }))}
                                />
                            </div>
                        </div>
                        <div className="form-rows">

                            <div className="form-row">
                                <label htmlFor="pet-select" className="label-form">Status <span>*</span></label>
                                <Select
                                    name="employment_status"
                                    onChange={(selectedOption) => handleSelectChange(selectedOption, "employment_status")}
                                    options={statusE.map((item) => ({
                                        value: item.nom_status,
                                        label: item.nom_status
                                    }))}
                                />
                            </div>
                        </div>
                        <button className="form-btn" onClick={handlePhotoSubmit}>Envoyer <SendIcon className='form-icon' /></button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Formulaire