import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../clientTab/clientView/clientView.scss'
import { CalendarMonth, Person2Outlined, Person3Outlined } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import config from '../../../config'
import moment from 'moment';

const HoraireView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/horairesAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);

    const formattedDateEntrant = moment(data?.start_date).format('DD/MM/YYYY');
    const formattedDatSortant = moment(data?.end_date).format('DD/MM/YYYY');
  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">HORAIRE</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Agent :</span>
                        <span className="client-nom">{data?.first_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3Outlined/>  Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/> Date de debut :</span>
                        <span className="client-nom">{formattedDateEntrant}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de la fin :</span>
                        <span className="client-nom">{formattedDatSortant}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Week-end :</span>
                        <span className="client-nom">{data?.days}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/>   Heure d'arrivée :</span>
                        <span className="client-nom">{data && data.start_time && data.start_time.substring(0, 5)}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/>  Heure de sortie :</span>
                        <span className="client-nom">{data && data.end_time && data.end_time.substring(0, 5)}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HoraireView