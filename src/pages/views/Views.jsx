import { useEffect, useState } from 'react';
import './views.scss'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import userImg from './../../assets/user.png'
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import EventIcon from '@mui/icons-material/Event';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import WcIcon from '@mui/icons-material/Wc';
import config from '../../config'
import ShowChartIcon from '@mui/icons-material/ShowChart';

const Views = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

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

    const formattedDateOfBirth = moment(data.date_of_birth).format('DD/MM/YYYY');

  return (
    <>
        <div className="views">
            <div className="views-wrapper">
                <div className="views-title">
                    <h1 className='h1-views'>INFORMATION DE L'EMPLOYE</h1>
                </div>
                <div className="views-rows-items">
                    <div className="views-container">
                        <div className="views-ctn1">
                            <div className="views-cont2">
                                <h2 className="view-h2"><span>*</span> Detail Personnel :</h2>
                                <div className="views-rows">
                                    <div className="views-left">
                                        <span className="view-label"><AccountCircleIcon className="icon-person"/>Nom : </span>
                                        <span className="view-result">{data.first_name}</span>
                                    </div>
                                    <div className="views-right">
                                        <span className="view-label"><AccountCircleIcon className="icon-person"/>Prenom : </span>
                                        <span className="view-result">{data.last_name}</span>
                                    </div>
                                </div>

                                <div className="views-rows">
                                    <div className="views-left">
                                        <span className="view-label"><EventIcon className="icon-person"/>Date de naissance : </span>
                                        <span className="view-result">{formattedDateOfBirth}</span>
                                    </div>
                                    <div className="views-right">
                                        <span className="view-label"><WcIcon className="icon-person"/> Genre : </span>
                                        <span className="view-result">{data.gender}</span>
                                    </div>
                                </div>

                                <div className="views-rows">
                                    <div className="views-left">
                                        <span className="view-label"><AddLocationAltIcon className="icon-person"/>Adresse : </span>
                                        <span className="view-result">{data.address}</span>
                                    </div>
                                    <div className="views-right">
                                        <span className="view-label"><AddIcCallIcon className="icon-person"/>Téléphone : </span>
                                        <span className="view-result">{data.phone_number}</span>
                                    </div>
                                </div>

                                <div className="views-rows">
                                    <div className="views-left">
                                        <span className="view-label"><MailOutlineIcon className="icon-person"/>Email : </span>
                                        <span className="view-result">{data.email}</span>
                                    </div>
                                    <div className="views-right">
                                        <span className="view-label"><ContactEmergencyIcon className="icon-person"/>Numero du pièce : </span>
                                        <span className="view-result">{data.identification_number}</span>
                                    </div>
                                </div>

                                <div className="views-rows">
                                    <div className="views-left">
                                        <span className="view-label"><RecentActorsIcon className="icon-person"/>Etat civil : </span>
                                        <span className="view-result">{data.etat_civil}</span>
                                    </div>
                                    <div className="views-right">
                                        <span className="view-label"><EngineeringIcon className="icon-person"/>Nombre d'enfant : </span>
                                        <span className="view-result">{data.nombre_enfant}</span>
                                    </div>
                                </div>
                            </div>
                            <img src={data.source ? `../upload/${data.source}` : userImg } alt="" className="views-photo" />
                        </div>

                        <h2 className="view-h2"><span>*</span> Detail Professionel :</h2>
                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label"><RecentActorsIcon className="icon-person"/>N° INPP : </span>
                                <span className="view-result">{data.number_inpp}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label"><EngineeringIcon className="icon-person"/>N° CNSS : </span>
                                <span className="view-result">{data.number_cnss}</span>
                            </div>
                            <div className="views-left">
                                <span className="view-label"><RecentActorsIcon className="icon-person"/>Type du pièce : </span>
                                <span className="view-result">{data.identification_type}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-right">
                                <span className="view-label"><EngineeringIcon className="icon-person"/>Compétence : </span>
                                <span className="view-result">{data.skills}</span>
                            </div>
                            <div className="views-left">
                                <span className="view-label"><WysiwygIcon  className="icon-person"/>Certificat : </span>
                                <span className="view-result">{data.certifications}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label"><WysiwygIcon  className="icon-person"/>Status : </span>
                                <span className="view-result">{data.employment_status}</span>
                            </div>
                        </div>

                        <div className="views-rows">
                            <div className="views-left">
                                <span className="view-label"><WysiwygIcon  className="icon-person"/>Certificat : </span>
                                <span className="view-result">{data.certifications}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label"><WysiwygIcon  className="icon-person"/>Status : </span>
                                <span className="view-result">{data.employment_status}</span>
                            </div>
                            <div className="views-left">
                                <span className="view-label"><ShowChartIcon  className="icon-person"/>Affectation : </span>
                                <span className="view-result">{data.nom_client}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Views