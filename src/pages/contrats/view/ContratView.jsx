import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './../../clientTab/clientView/clientView.scss'
import { CalendarMonth, CodeOffOutlined, ContactPage, EmailOutlined, LoginOutlined, MapsHomeWorkOutlined, PasswordOutlined, Person2Outlined, PhoneAndroidOutlined } from '@mui/icons-material';
import config from '../../../config'
import moment from 'moment';

const ContratView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/contrat/views/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const formattedDatEntrant = moment(data?.start_date).format('DD/MM/YYYY');
    const formattedDatSortant = moment(data?.end_date).format('DD/MM/YYYY');
  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION DU CONTRAT</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Type du contrat :</span>
                        <span className="client-nom">{data?.contract_type}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Client :</span>
                        <span className="client-nom">{data?.client_id}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/> Date de début :</span>
                        <span className="client-nom">{formattedDatEntrant}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/> Date de la fin :</span>
                        <span className="client-nom">{formattedDatSortant}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ContratView 