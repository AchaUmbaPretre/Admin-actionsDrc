import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './missionView.scss'
import { format } from 'date-fns';
import { CalendarMonth, Money, Person, Person3 } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import config from '../../../config'
import moment from 'moment';

const MissionView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/missionAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, [id]);

    const formattedDateEntrant = moment(data?.dateEntrant).format('DD/MM/YYYY');
    const formattedDatSortant = moment(data?.dateSortant).format('DD/MM/YYYY');

  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">INFORMATION DE MISSION</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person/> Agent :</span>
                        <span className="client-nom">{data?.first_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3/>  Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de début :</span>
                        <span className="client-nom">{formattedDateEntrant}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonth/>  Date de fin :</span>
                        <span className="client-nom">{formattedDatSortant}</span>
                    </div>
                    
                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/>  durée :</span>
                        <span className="client-nom">{data?.duree} mois</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><Money/>  Montant :</span>
                        <span className="client-nom">{data?.montant}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MissionView