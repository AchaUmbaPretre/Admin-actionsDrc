import { useEffect, useRef, useState } from 'react'
import './edit.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import userImg from '../../../assets/user.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import Webcam from 'react-webcam';
import config from '../../../config'

const Edit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

const [data, setData] = useState({});
const {first_name, last_name,date_of_birth, gender,address, phone_number,email, identification_number,identification_type,skills,certifications,employment_status,source} = data;
const location = useLocation();
const navigate = useNavigate();
const id = location.pathname.split("/")[2];
const [sources, setSources] = useState('import');
const [photo, setPhoto] = useState(null);
const webcamRef = useRef(null);
  
const handleFileChange = (event) => {
  setPhoto(event.target.files[0]);
};
const handleSourceChange = (event) => {
    setSources(event.target.value);
  };
const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  console.log(photo)

  const handlePhotoSubmit = () => {
    if (source === 'import') {
      const formData = new FormData();
      formData.append('photo', photo);
    } else if (source === 'webcam') {
      const photoSrc = webcamRef.current.getScreenshot();
    }
  }

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

    try {
      await axios.put(`${DOMAIN}/api/admin/employe/${id}`, data);
      Swal.fire({
        title: 'Success',
        text: 'Employé mis à jour avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/personnel');
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
        <div className="edit-person">
            <div className="formulaire-wrapper">
                <div className="formulaire-left">
                    {source? <img src={`../upload/${source}`} className="form-img2"/> : <img src={userImg} alt="" className="form-img" /> }
                    <div className="form-img-rows">
                        <div className="form-img-row">
                            <input type="radio" name="source" value="import" checked={source === 'import'} onChange={handleSourceChange} className='radio-img' />
                            <span className="form-title-img">Importer une photo</span>
                        </div>
                        <div className="form-img-row">
                            <input type="radio" name="source" value="webcam" checked={source === 'webcam'} onChange={handleSourceChange} className='radio-img' />
                            <span className="form-title-img">Prendre une photo avec la webcam</span>
                        </div>
                        {source === 'import' && <input type="file" name="photo" value={source} onChange={handleFileChange} />}
                        {source === 'webcam' && <Webcam audio={false} ref={webcamRef} className='pop-img' />}
                        <button onClick={capture}>Capture photo</button>
                    </div>
                </div>
                <div className="formulaire-right">
                    <form action="" className="form-center">
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nom <span>*</span></label>
                                <input type="text"  name='first_name' value={first_name} className="input-form" onChange={handleChange} placeholder='Entrez votre nom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Prenom <span>*</span></label>
                                <input type="text" name="last_name" value={last_name} className="input-form" onChange={handleChange} placeholder='Entrez votre postnom..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Email <span>*</span></label>
                                <input type="text"  name='email' value={email} className="input-form" onChange={handleChange} placeholder='Entrez votre adresse email..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                                <input type="text"  name='address' value={address} className="input-form" onChange={handleChange} placeholder='Entrez votre adresse..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Numero du pièce <span>*</span></label>
                                <input type="number" name='identification_number' value={identification_number} className="input-form" onChange={handleChange} placeholder='Entrez votre numero du pièce..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Type du pièce <span>*</span></label>
                                <select id="pet-select" name="identification_type" value={identification_type} className='form-select' onChange={handleChange}>
                                    <option value="carte d'identité">Carte d'identité</option>
                                    <option value="passeport">passeport</option>
                                    <option value="carte d'identité">Carte d'identité</option>
                                    <option value="permis de conduire">Permis de conduire</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Competence <span>*</span></label>
                                <input type="text" name='skills' value={skills} className="input-form" onChange={handleChange} placeholder="Entrez tes compténces.."  />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Niveau d'étude <span>*</span></label>
                                <input type="text" name='certifications' value={certifications} className="input-form" onChange={handleChange} placeholder="Entrez votre niveau d'étude.." />
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Telephone <span>*</span></label>
                                <input type="number" name='phone_number' value={phone_number} className="input-form" onChange={handleChange} placeholder="Entrez votre numero de tel.."  />
                            </div>
                            <div className="form-row">
                                <label htmlFor="pet-select" className="label-form">Status <span>*</span></label>
                                <select id="pet-select" className='form-select' value={employment_status} name="employment_status" onChange={handleChange}>
                                    <option value="interne">Interne</option>
                                    <option value="externe">Externe</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Date de naissance <span>*</span></label>
                                <input type="date" name="date_of_birth" value={date_of_birth} className="input-form" onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Genre <span>*</span></label>
                                <div className="form-radio">
                                    <input type="radio" id="Choice1" defaultValue={gender} onChange={handleChange} name="gender" checked value="homme" />
                                    <label for="Choice1">Homme</label>
                                    <input type="radio" id="Choice2" defaultValue={gender} onChange={handleChange} name="gender" value="femme" />
                                    <label for="Choice2">Femme</label>
                                </div>
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