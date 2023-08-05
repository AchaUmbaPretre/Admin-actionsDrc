import { useRef, useState } from 'react';
import './formulaire.scss'
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import userImg from './../../../assets/user.png'
import Webcam from 'react-webcam';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');


const Formulaire = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [source, setSource] = useState('import');
    const [message, setMessage] = useState(null);
    const [photo, setPhoto] = useState(null);
    const webcamRef = useRef(null);
  
    const handleFileChange = (event) => {
      setPhoto(event.target.files[0]);
    };
    const handleSourceChange = (event) => {
        setSource(event.target.value);
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
      const upload = async ()=>{
        try{
          const formData = new FormData();
          formData.append('file', photo)
          const res = await axios.post("http://localhost:8080/api/upload", formData)
          return res.data
        }
        catch(error){
          console.log(error)
        }
      }
    const handleClick = async(e) =>{
        e.preventDefault();
        const imgUrl = await upload();

        try{
            await axios.post(`http://localhost:8080/api/admin/employe`,{...data, source: imgUrl })
            navigate("/personnel")
        }
        catch(error){
            console.log(error)
        }
    }

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
                        {source === 'import' && <input type="file" name="photo" onChange={handleFileChange} />}
                        {source === 'webcam' && <Webcam audio={false} ref={webcamRef} className='pop-img' />}
                    </div>
                </div>
                <div className="formulaire-right">
                    <form action="" className="form-center">
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Nom <span>*</span></label>
                                <input type="text"  name='first_name'  className="input-form" onChange={handleChange} placeholder='Entrez votre nom..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Prenom <span>*</span></label>
                                <input type="text" name="last_name" className="input-form" onChange={handleChange} placeholder='Entrez votre postnom..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Email <span>*</span></label>
                                <input type="text"  name='email' className="input-form" onChange={handleChange} placeholder='Entrez votre adresse email..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Adresse <span>*</span></label>
                                <input type="text"  name='address' className="input-form" onChange={handleChange} placeholder='Entrez votre adresse..' />
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Numero du pièce <span>*</span></label>
                                <input type="number" name='identification_number' className="input-form" onChange={handleChange} placeholder='Entrez votre numero du pièce..' />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Type du pièce <span>*</span></label>
                                <select id="pet-select" name="identification_type" className='form-select' onChange={handleChange}>
                                    <option value="carte d'identité" defaultValue={"carte d'identité"}>Carte d'identité</option>
                                    <option value="passeport">passeport</option>
                                    <option value="permis de conduire">Permis de conduire</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Competence <span>*</span></label>
                                <input type="text" name='skills' className="input-form" onChange={handleChange} placeholder="Entrez tes compténces.."  />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Niveau d'étude <span>*</span></label>
                                <select id="pet-select" name="identification_type" className='form-select' onChange={handleChange}>
                                    <option value="licence">Licence</option>
                                    <option value="graduat">Graduat</option>
                                    <option value="humanité">Humanité</option>
                                    <option value="secondaire">Secondaire</option>
                                    <option value="primaire">Primaire</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Telephone <span>*</span></label>
                                <input type="number" name='phone_number' className="input-form" onChange={handleChange} placeholder="Entrez votre numero de tel.."  />
                            </div>
                            <div className="form-row">
                                <label htmlFor="pet-select" className="label-form">Status <span>*</span></label>
                                <select id="pet-select" className='form-select' name="employment_status" onChange={handleChange}>
                                    <option value="interne">Interne</option>
                                    <option value="externe">Externe</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-rows">
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Date de naissace <span>*</span></label>
                                <input type="date" name="date_of_birth" className="input-form" onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="label-form">Genre <span>*</span></label>
                                <div className="form-radio">
                                    <input type="radio" id="Choice1" onChange={handleChange} name="gender" checked value="homme" />
                                    <label for="Choice1">Homme</label>
                                    <input type="radio" id="Choice2" onChange={handleChange} name="gender" value="femme" />
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

export default Formulaire