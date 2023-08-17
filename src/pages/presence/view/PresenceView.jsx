import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CalendarMonthOutlined, Person2Outlined, Person3Outlined } from '@mui/icons-material';
import config from '../../../config'

const PresenceView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN
    const [data, setData] = useState({});
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/admin/presenceAllView/${id}`);
                setData(res.data[0])
        
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
    }, []);
  return (
    <>
        <div className="clientView">
            <div className="clientView-wrapper">
                <h2 className="client-title">Presence</h2>
                <div className="client-rows">
                    <div className="client-row">
                        <span className="client-nom"><Person2Outlined/> Agent :</span>
                        <span className="client-nom">{data?.first_name}</span>
                    </div>
                    <div className="client-row">
                        <span className="client-nom"><Person3Outlined/> Client :</span>
                        <span className="client-nom">{data?.company_name}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><CalendarMonthOutlined/> Date de la presence :</span>
                        <span className="client-nom">{data?.date}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/> Heure d'arrivée :</span>
                        <span className="client-nom">{data?.check_in_time}</span>
                    </div>

                    <div className="client-row">
                        <span className="client-nom"><AccessTimeIcon/> Heure de départ  :</span>
                        <span className="client-nom">{data?.check_out_time}</span>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default PresenceView