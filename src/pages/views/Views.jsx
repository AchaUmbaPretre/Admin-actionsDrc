import { useEffect, useState } from 'react';
import './views.scss'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import userImg from './../../assets/user.png'
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import EventIcon from '@mui/icons-material/Event';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import WcIcon from '@mui/icons-material/Wc';

const Views = () => {
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`http://localhost:8080/api/admin/views/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);

    const formattedDateOfBirth = moment(data.date_of_birth).format('DD/MM/YYYY');

  return (
    <>
        <div className="views">
            <div className="views-wrapper">
                <div className="views-title">
                    <h1 className='h1-views'>Information de l'employé</h1>
                    <span className="views-bar"></span>
                </div>
                <div className="views-rows-items">
                    <img src={data.source ? `../upload/${data.source}` : userImg } alt="" className="views-photo" />
                    <div className="views-container">
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
                                <span className="view-label"><RecentActorsIcon className="icon-person"/>Type du pièce : </span>
                                <span className="view-result">{data.identification_type}</span>
                            </div>
                            <div className="views-right">
                                <span className="view-label"><EngineeringIcon className="icon-person"/>Compétence : </span>
                                <span className="view-result">{data.skills}</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Views